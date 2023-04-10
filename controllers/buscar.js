const {handleHttpError} = require("../utils/handleError");
const {hotelModel, habitacionModel} = require("../models");


const buscar = async (req, res) => {
  try {
    const { ciudad, checkIn, checkOut, viajeros } = req.body;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    console.log(ciudad)
    console.log(checkIn)
    console.log(checkOut)
    console.log(viajeros)

    // Buscar hoteles que coincidan con la ciudad
    const hoteles = await hotelModel.find({ ciudad });

    // Crear un array de objetos con la información de los hoteles disponibles
    const hotelesDisponibles = [];

    // Iterar sobre cada hotel
    for (const hotel of hoteles) {
      console.log(hotel)
      // Obtener las habitaciones del hotel que tienen suficientes plazas para el número de viajeros
      const habitacionesDisponibles = await habitacionModel.aggregate([
        { $match: { hotel: hotel._id, num_plazas: { $gte: viajeros } } },
        {
          $lookup: {
            from: "reservas",
            let: { habitacion_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$habitacion", "$$habitacion_id"] },
                      {
                        $or: [
                          {
                            $and: [
                              { $gte: ["$checkIn", checkInDate] },
                              { $lte: ["$checkIn", checkOutDate] },
                            ],
                          },
                          {
                            $and: [
                              { $gte: ["$checkOut", checkInDate] },
                              { $lte: ["$checkOut", checkOutDate] },
                            ],
                          },
                          {
                            $and: [
                              { $lte: ["$checkIn", checkInDate] },
                              { $gte: ["$checkOut", checkOutDate] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: "reservas",
          },
        },
        {
          $match: {
            "reservas._id": { $exists: false },
          },
        },
        {
          $group: {
            _id: "$num_plazas",
            habitaciones: {
              $push: {
                _id: "$_id",
                num_plazas: "$num_plazas",
              },
            },
            totalPlazas: { $sum: "$num_plazas" },
          },
        },
        {
          $match: {
            totalPlazas: { $gte: viajeros },
          },
        },
      ]);

      console.log(habitacionesDisponibles)

      // Añadir el hotel y las habitaciones disponibles al array
      if (habitacionesDisponibles.length > 0) {
        hotelesDisponibles.push({
          hotel: {
            _id: hotel._id,
            nombre: hotel.nombre,
          },
          habitaciones: habitacionesDisponibles,
        });
      }
    }
    console.log(hotelesDisponibles)
    res.send(hotelesDisponibles);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "SEARCH_ERROR");
    return;
  }
};

const buscarEnHotel = async (req, res) => {
  try {
    req = matchedData(req);
    const { ciudad, checkIn, checkOut, viajeros } = req.body;
    const { id } = req.query;

    res.send("respuesta");
  } catch (e) {
    console.log(e);
    handleHttpError(res, "SEARCH_ERROR");
    return;
  }
};

module.exports = { buscar, buscarEnHotel };

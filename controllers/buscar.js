const {handleHttpError} = require("../utils/handleError");
const {hotelModel, habitacionModel} = require("../models");


const buscar = async (req, res) => {
  try {
    const { ciudad, checkIn, checkOut, viajeros } = req.body;
    
    // se convierte a fecha
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Buscar hoteles que coincidan con la ciudad
    const hoteles = await hotelModel.find({ ciudad });

    // Crear un array de objetos con la información de los hoteles disponibles
    const hotelesDisponibles = [];

    // Iterar sobre cada hotel que coincida con la ciudad buscada
    for (const hotel of hoteles) {

      // Obtener las habitaciones del hotel que tienen suficientes plazas para el número de viajeros
      // aggregate => msql GROUP BY  
      const habitacionesDisponibles = await habitacionModel.aggregate([

        // buscar las habitaciones que estén en hotel con Query Language
        // y que tengan suficientes plazas para el número de viajeros que se busca.
        // match , gte => >=
        { $match: { hotel: hotel._id, num_plazas: { $gte: viajeros } } },

          // buscar reservas que ya existan en esas habitaciones en las fechas que se buscan. 
          // Esto lo hace usando el modelo de reserva ("reservas") 
          // y especificando que sólo se buscan las reservas que tengan la misma habitación 
          // que la que se está analizando en ese momento
          // lookup => mysql INNER JOIN
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
          // filtrar sólo las habitaciones que no tengan reservas 
        {
          $match: {
            "reservas._id": { $exists: false },
          },
        },
          // agrupar las habitaciones por el número de plazas 
          // y crear un objeto que contenga todas las habitaciones que tengan el mismo número de plazas
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
          // filtrar sólo las habitaciones cuyo número total de plazas 
          // sea suficiente para el número de viajeros que se busca
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
          // se crea un objeto para recoger el hotel y las habitaciones del mismo disponibles
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

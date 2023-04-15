const {handleHttpError} = require("../utils/handleError");
const {hotelModel, habitacionModel} = require("../models");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const buscar = async (req, res) => {
  try {
    const { ciudad, checkIn, checkOut, viajeros } = req.body;
    const user = req.user
    
    // se convierte a fecha
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Buscar hoteles que coincidan con la ciudad
    const hoteles = await hotelModel.find({ ciudad });

    // Crear un array de objetos con la información de los hoteles disponibles
    const reservas = [];
    
    for (const hotel of hoteles) {
   
      const habitacionesDisponibles = await habitacionModel.aggregate([

        // Obtener las habitaciones del hotel que tienen suficientes plazas 
        { $match: { hotel: hotel._id, num_plazas: { $eq: viajeros }} },
        // filtrar las reservas que se superponen con las fechas especificadas en la consulta
        {
          $lookup: {
            from: "reservas",
            let: {
              habitacionId: "$_id",
              checkIn: checkInDate,
              checkOut: checkOutDate,
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$habitacion", "$$habitacionId"] }, // igual id habitación
                      { $lte: ["$fechaCheckin", "$$checkOut"] }, // fecha checkin reserva menor que checkOut búsqueda
                      { $gte: ["$fechaCheckout", "$$checkIn"] }, // fecha checkout reserva menor que checkIn búsqueda
                      { $eq: ["$aceptada", true] }, // que su estado sea aceptada
                    ],
                  },
                },
              },
              // se cuentan las reservas
              { $count: "count" },
            ],
            as: "reservas",
          },
        },
        //  Si el número de reservas supera 0, significa que la habitación ya está reservada
        { $match: { reservas: { $size: 0 } } },
      ]);

      if (habitacionesDisponibles.length > 0) {
       
        habitacionesDisponibles.map(habitacion => {
          reservas.push({
          // el cliente que está realizando la consulta es el que reserva
          cliente:user._id,
          // se crea un objeto para recoger el hotel y las habitaciones del mismo disponibles
          hotel: hotel._id,
          fechaCheckin: checkInDate,
          fechaCheckout: checkOutDate,
          numPlazas : viajeros,
          habitacion: habitacion._id,
          aceptada: false
        });
        }) 
      }
    }
    
    res.send(reservas);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "SEARCH_ERROR");
    return;
  }
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const buscarEnHotel = async (req, res) => {
  try {
    req = matchedData(req);
    const { ciudad, checkIn, checkOut, viajeros } = req.body;
    const { id } = req.query;

    /////////////////////////////

    // se convierte a fecha
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Buscar el hotel por ID
    const hotel = await hotelModel.findById(id);

    // Obtener las habitaciones del hotel que tienen suficientes plazas para el número de viajeros
  
    ////////////////////////////
    res.send("respuesta");
  } catch (e) {
    console.log(e);
    handleHttpError(res, "SEARCH_ERROR");
    return;
  }
};


module.exports = { buscar, buscarEnHotel };
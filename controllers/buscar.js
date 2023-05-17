const {handleHttpError} = require("../utils/handleError");
const {hotelModel, habitacionModel, precioHabitacionModel, imagenModel} = require("../models");
const { matchedData } = require('express-validator');

/**
 * Busca hoteles disponibles para reservar según los criterios especificados en el cuerpo de la solicitud
 * @param {*} req - Solicitud HTTP
 * @param {*} res - Respuesta HTTP
 * @returns Un array de objetos de reserva disponibles para las fechas y número de viajeros especificados en la solicitud.
 */
const buscar = async (req, res) => {
  try {
    const { ciudad, checkIn, checkOut, viajeros } = req.body;
    // const user = req.user
    
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
       
        // Calcular el número de noches en el rango de fechas (dado en miliseg)
        const numNoches = ( checkOutDate.getTime() - checkInDate.getTime() ) / 1000 / 60 / 60 / 24;

        for (const habitacion of habitacionesDisponibles) {
          // Obtener los precios por noche para la habitación y rango de fechas
          const preciosPorNoche = await precioHabitacionModel.find({
            habitacion: habitacion._id,
            fecha_inicio: { $lte: checkInDate }
          });

          // si encuentra varios objetos precioHabitacion, recoge el más reciente
          const precioMasReciente = preciosPorNoche.reduceRight((precioMasReciente, precioPorNoche) => {
            if (!precioMasReciente) {
              return precioPorNoche;
            }
            return precioPorNoche.createdAt > precioMasReciente.createdAt ? precioPorNoche : precioMasReciente;
          });
          
          const precioTotalPorNoche = numNoches * precioMasReciente.precio;

          ////
          const imagenId = hotel.imagenes[0]; // ID de la imagen
      const imagen = await imagenModel.findById(imagenId); // Consulta para obtener la imagen

      if (imagen) {
        const imagenUrl = imagen.url; // URL de la imagen
          ////
          console.log(precioTotalPorNoche, 'precio total por noche')
          reservas.push({
            /**
          // el cliente que está realizando la consulta es el que reserva
          cliente:user._id, */
          // se crea un objeto para recoger el hotel y las habitaciones del mismo disponibles
          hotelId: hotel._id,
          nombreHotel: hotel.nombre,
          estrellas: hotel.estrellas,
          imagen: imagenUrl,
          fechaCheckin: checkInDate,
          fechaCheckout: checkOutDate,
          numPlazas : viajeros,
          habitacionId: habitacion._id,
          precioTotal : precioTotalPorNoche,
        });
      }
        }
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
 * @param {*} req - Solicitud HTTP
 * @param {*} res - Respuesta HTTP
 * @returns Un array de objetos de reserva disponibles para las fechas y número de viajeros especificados en la solicitud.
 */
const buscarEnHotel = async (req, res) => {
  try{
      const { id } = req.params

      console.log( id)
      const { checkIn, checkOut, viajeros } = req.body;
      //const user = req.user
    console.log(req.body)

    // se convierte a fecha
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Buscar el hotel por ID
    const hotel = await hotelModel.findById(id);

    // Crear un array de objetos con la información de las habitaciones disponibles
    const reservas = [];

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
     
      // Calcular el número de noches en el rango de fechas (dado en miliseg)
      const numNoches = ( checkOutDate.getTime() - checkInDate.getTime() ) / 1000 / 60 / 60 / 24;

      for (const habitacion of habitacionesDisponibles) {
        // Obtener los precios por noche para la habitación y rango de fechas
        const preciosPorNoche = await precioHabitacionModel.find({
          habitacion: habitacion._id,
          fecha_inicio: { $lte: checkInDate }
        });

        // si encuentra varios objetos precioHabitacion, recoge el más reciente
        const precioMasReciente = preciosPorNoche.reduceRight((precioMasReciente, precioPorNoche) => {
          if (!precioMasReciente) {
            return precioPorNoche;
          }
          return precioPorNoche.createdAt > precioMasReciente.createdAt ? precioPorNoche : precioMasReciente;
        });
        
        const precioTotalPorNoche = numNoches * precioMasReciente.precio;

        ///
        const imagenId = habitacion.imagenes[0]; // ID de la imagen
      const imagen = await imagenModel.findById(imagenId); // Consulta para obtener la imagen

      if (imagen) {
        const imagenUrl = imagen.url; // URL de la imagen
        ///
        console.log(precioTotalPorNoche, 'precio total por noche')
        reservas.push({
          /** 
        // el cliente que está realizando la consulta es el que reserva
        cliente:user._id,*/
        // se crea un objeto para recoger el hotel y las habitaciones del mismo disponibles
        fechaCheckin: checkInDate,
        fechaCheckout: checkOutDate,
        numPlazas : viajeros,
        habitacionId: habitacion._id,
        imagen: imagenUrl,
        vistas: habitacion.vistas,
        tipoCama: habitacion.tipo_cama,
        precioTotal : precioTotalPorNoche,
      });
      }
    }
    }



    res.send(reservas);
  } catch (e) {
    console.log(e);
    handleHttpError(res, "SEARCH_ERROR");
    return;
  }
};


module.exports = { buscar, buscarEnHotel };

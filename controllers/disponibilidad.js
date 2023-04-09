const Reserva = require('./models/reserva');
const Habitacion = require('./models/habitacion');

// TODO: Comprobar, probar y usar este controlador


async function comprobarDisponibilidad(hotelId, habitacionId, fechaInicio, fechaFin) {
  // Buscar todas las reservas que solapen con el rango de fechas dado
  const reservas = await Reserva.find({
    hotel: hotelId,
    habitaciones: habitacionId,
    $or: [
      { fechaCheckin: { $lt: fechaFin }, fechaCheckout: { $gt: fechaInicio } },
      { fechaCheckin: { $gte: fechaInicio, $lte: fechaFin } },
      { fechaCheckout: { $gte: fechaInicio, $lte: fechaFin } }
    ]
  });

  // Si hay alguna reserva que solape con el rango de fechas, la habitación no está disponible
  if (reservas.length > 0) {
    return false;
  }

  // Si no hay reservas que solapen con el rango de fechas, la habitación está disponible
  return true;
}

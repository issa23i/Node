const { resenaModel, hotelModel, reservaModel } = require('../models');

/**
 * Actualiza la puntuación del hotel, haciendo media de todas las reseñas
 * @param {string} hotelId - Identificador del hotel.
 * @returns {Promise<void>} - Promesa que se resuelve cuando se actualiza la puntuación del hotel.
 */
async function setPuntuacionHotel(hotelId) {
    const reservas = await reservaModel.find({ hotel: hotelId })

    // Creamos un array con los ids de las reservas del hotel
    const reservasIds = reservas.map(reserva => reserva._id);

    // Buscamos todas las reseñas cuyas reservas coinciden con las reservas del hotel
    const resenas = await resenaModel.find({ reserva: { $in: reservasIds } });

    // Calculamos la puntuación media
    const totalPuntuacion = resenas.reduce((total, resena) => total + resena.puntuacion, 0);
    const mediaPuntuacion = resenas.length > 0 ? totalPuntuacion / resenas.length : 0;

    // Actualizar la puntuación del hotel con la nueva puntuación promedio
    await hotelModel.updateOne({ _id: hotelId }, { puntuacion_resenas: mediaPuntuacion });
}

module.exports = setPuntuacionHotel
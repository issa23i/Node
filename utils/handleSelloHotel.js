const { kellyModel, hotelModel} = require('../models');

/**
 * Acutaliza el sello del hotel, haciendo media de todas las puntuaciones de las kellys que trabajan en el hotel
 * Pasar el id del hotel
 * @param {*} hotelId 
 */
async function setSello (hotelId) {
    const kellys = await kellyModel.find({ hotel: hotelId })
    
    // Si no hay kellys que hayan puntuado el hotel, entonces no tiene sello
    if (kellys.length === 0) {
        await hotelModel.findByIdAndUpdate(hotelId, { tieneSello: false });
    }

    // Calcular la media de las puntuaciones de las kellys
    const totalPuntuaciones = kellys.reduce((acumulador, actual) => acumulador + actual.puntuacion, 0);
    const mediaPuntuaciones = totalPuntuaciones / kellys.length;

    const obtieneSello = mediaPuntuaciones >=5

    // Actualizar el estado del sello
    await hotelModel.updateOne({ _id: hotelId }, { tieneSello: obtieneSello })
}

module.exports = setSello
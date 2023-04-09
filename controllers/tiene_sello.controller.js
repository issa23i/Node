const Kelly = require('../models/kelly.model');
const Hotel = require('../models/hotel.model');

// TODO: Comprobar, probar y usar este controlador

exports.calculateTieneSello = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    // Obtener todas las kellys que han puntuado el hotel
    const kellys = await Kelly.find({ hotel: hotelId }).select('puntuacion');
    
    // Si no hay kellys que hayan puntuado el hotel, entonces no tiene sello
    if (kellys.length === 0) {
      await Hotel.findByIdAndUpdate(hotelId, { tieneSello: false });
      return res.status(200).json({ message: 'El hotel no tiene suficientes puntuaciones para tener sello' });
    }
    
    // Calcular la media de las puntuaciones de las kellys
    const totalPuntuaciones = kellys.reduce((acc, curr) => acc + curr.puntuacion, 0);
    const mediaPuntuaciones = totalPuntuaciones / kellys.length;
    
    // Si la media de las puntuaciones es mayor o igual a 5, entonces tiene sello
    const tieneSello = mediaPuntuaciones >= 5;
    await Hotel.findByIdAndUpdate(hotelId, { tieneSello });

    return res.status(200).json({ message: `El hotel ${tieneSello ? 'tiene' : 'no tiene'} sello` });
  } catch (error) {
    next(error);
  }
};

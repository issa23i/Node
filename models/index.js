/**
 * Objeto que contiene todos los modelos utilizados para interactuar con la base de datos.
Cada modelo se encuentra en una ruta especificada y se importa con la función require().
Si un modelo ya existe en el objeto, simplemente se importa, de lo contrario se crea.
 * @type {object}
 * @property {object} habitacionModel - Modelo para interactuar con la colección de habitaciones en la base de datos.
 * @property {object} hotelModel - Modelo para interactuar con la colección de hoteles en la base de datos.
 * @property {object} imagenModel - Modelo para interactuar con la colección de imágenes en la base de datos.
 * @property {object} kellyModel - Modelo para interactuar con la colección de kellys en la base de datos.
 * @property {object} personaModel - Modelo para interactuar con la colección de personas en la base de datos.
 * @property {object} precioHabitacionModel - Modelo para interactuar con la colección de precios de habitaciones en la base de datos.
 * @property {object} resenaModel - Modelo para interactuar con la colección de reseñas en la base de datos.
 * @property {object} reservaModel - Modelo para interactuar con la colección de reservas en la base de datos.
 */
const models = {
    habitacionModel : require('./nosql/habitacion.model'),
    hotelModel : require('./nosql/hotel.model'),
    imagenModel : require('./nosql/imagen.model'),
    kellyModel : require('./nosql/kelly.model'),
    personaModel : require('./nosql/persona.model'),
    precioHabitacionModel : require('./nosql/precio_habitacion.model'),
    resenaModel : require('./nosql/resena.model'),
    reservaModel : require('./nosql/reserva.model')     
}

module.exports = models
const { body, param } = require('express-validator');

/**
 * Validación de los campos necesarios para crear un precio de habitación
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función middleware para pasar al siguiente controlador
 */
const createPrecioHabitacionValidation = [
  body('habitacion').exists().notEmpty().isMongoId(),
  body('fecha_inicio').exists().isDate(),
  body('fecha_fin').exists().isDate(),
  body('precio').exists().isFloat({ min: 0 }),
];

/**
 * Validación del parámetro id necesario para obtener un precio de habitación
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función middleware para pasar al siguiente controlador
 */
const getPrecioHabitacionValidation = [
  param('id').exists().notEmpty().isMongoId(),
];

module.exports = {
  createPrecioHabitacionValidation,
  getPrecioHabitacionValidation,
};

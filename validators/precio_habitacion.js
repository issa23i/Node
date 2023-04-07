const { body, param } = require('express-validator');

const createPrecioHabitacionValidation = [
  body('habitacion').exists().notEmpty().isMongoId(),
  body('fecha_inicio').exists().isDate(),
  body('fecha_fin').exists().isDate(),
  body('precio').exists().isFloat({ min: 0 }),
];

const getPrecioHabitacionValidation = [
  param('id').exists().notEmpty().isMongoId(),
];

module.exports = {
  createPrecioHabitacionValidation,
  getPrecioHabitacionValidation,
};

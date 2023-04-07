const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/precio_habitacion')
const router = express.Router()
const { createPrecioHabitacionValidation, getPrecioHabitacionValidation } = require('../validators/precio_habitacion')
const customHeader = require('../middleware/customHeader')

// http://localhost:3001/precio_habitacion GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", getItems)

/**
 * Obtener un detalle (item)
 */
router.get('/:id', getPrecioHabitacionValidation, getItem)

/**
 * Crear un registro (item)
 */
router.post("/", createPrecioHabitacionValidation, /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', getPrecioHabitacionValidation, createPrecioHabitacionValidation, updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', getPrecioHabitacionValidation, deleteItem)

module.exports = router
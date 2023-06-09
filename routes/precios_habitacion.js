const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/precio_habitacion')
const router = express.Router()
const { createPrecioHabitacionValidation, getPrecioHabitacionValidation } = require('../validators/precio_habitacion')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')
const roles = require('../roles')

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
router.post("/", createPrecioHabitacionValidation, authMiddleware, checkRol([roles.admin]), /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', getPrecioHabitacionValidation, createPrecioHabitacionValidation, authMiddleware, checkRol([roles.admin]), updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', getPrecioHabitacionValidation, authMiddleware, checkRol([roles.admin]), deleteItem)

module.exports = router

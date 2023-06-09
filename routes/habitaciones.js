const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/habitacion')
const router = express.Router()
const { validationCreateItem, validationGetItem } = require('../validators/habitacion')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')
const roles = require('../roles')

// http://localhost:3001/habitaciones GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", getItems)

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetItem, getItem)

/**
 * Crear un registro (item)
 */
router.post("/", validationCreateItem, authMiddleware, checkRol(roles.admin), createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, authMiddleware, checkRol([roles.admin]), updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, authMiddleware, checkRol([roles.admin]), deleteItem)

module.exports = router

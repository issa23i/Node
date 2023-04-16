const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/persona')
const router = express.Router()
const { validationCreateItem, validationGetItem } = require('../validators/persona')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')

// http://localhost:3001/personas GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", authMiddleware, checkRol(['admin']), getItems)

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetItem, authMiddleware, checkRol(['admin', 'user']), getItem)

/**
 * Crear un registro (item)
 */
router.post("/", validationCreateItem, authMiddleware, checkRol(['admin']), /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, authMiddleware, checkRol(['admin']), updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, authMiddleware, checkRol(['admin']), deleteItem)

module.exports = router

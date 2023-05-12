const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/persona')
const router = express.Router()
const { validationCreateItem, validationGetItem, validationUpdateItem } = require('../validators/persona')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')
const roles = require('../roles')

// http://localhost:3001/personas GET, POST, DELETE, PUT

/**
 * Lista los items
 */
// No se permite en ningún caso listar los usuarios
//router.get("/", authMiddleware, checkRol(['admin']), getItems)

/**
 * Obtener un detalle (item)
 */
// Sólo el propio usuario puede ver su detalle (controlador getItem)
router.get('/:id', validationGetItem, authMiddleware, checkRol([ roles.user, roles.admin]), getItem)

/**
 * Crear un registro (item)
 */
router.post("/", validationCreateItem, authMiddleware, checkRol([roles.admin]), /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
// Para actualizar los datos del usuario se usará el controlador update en auth.js
//router.put('/:id', validationGetItem, validationUpdateItem, authMiddleware, checkRol(['user', 'admin']), updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, authMiddleware, checkRol([roles.admin]), deleteItem)

module.exports = router

const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/hoteles')
const router = express.Router() // invocar a el manejador Router
const authMiddleware = require('../middleware/session')
const { validationCreateItem, validationGetItem} = require('../validators/hoteles')
const customHeader = require('../middleware/customHeader')
const checkRol = require('../middleware/rol')

// http://localhost:3001/hoteles GET, POST, DELETE, PUT
// TODO: Colocar el authMiddleware a todas las rutas que queramos que el usuario esté autenticado
// TODO: Colocar los middleware authMiddleware y checkRol(['admin']) a las rutas que lo necesiten
/**
 * Lista los items
 */
// TODO: si borramos el authMiddleware, no verificará si hay sesión iniciada (bearer token)
router.get("/", authMiddleware, getItems) // middleware de session

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetItem, getItem)

/**
 * Crear un registro (item)
 */
router.post("/", validationCreateItem, authMiddleware, checkRol(['admin']),/**customHeader ,*/createItem) 

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, updateItem) // hace uso de dos middlewares

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, deleteItem)


module.exports = router
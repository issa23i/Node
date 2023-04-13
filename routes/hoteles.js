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
// TODO: Los hoteles sin sello no pueden aparecer en los listados, arreglar esto
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
// TODO: Verificar que existe el id de cada imagen (agregando una validación)
router.post("/", validationCreateItem, authMiddleware, checkRol(['admin']),/**customHeader ,*/createItem) 

/**
 * Actualizar un registro (item)
 */
// TODO: ,Verificar que el id de las habitaciones existe
router.put('/:id', validationGetItem, validationCreateItem, updateItem) // hace uso de dos middlewares

/**
 * Borrar un registro
 */
// TODO: Borrar en cascada las habitaciones
router.delete('/:id', validationGetItem, deleteItem)


module.exports = router
const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/hoteles')
const router = express.Router() // invocar a el manejador Router
const authMiddleware = require('../middleware/session')
const { validationCreateItem, validationGetItem} = require('../validators/hoteles')
const customHeader = require('../middleware/customHeader')
const checkRol = require('../middleware/rol')
const roles = require('../roles')

// http://localhost:3001/hoteles GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", /**authMiddleware,*/ getItems) // middleware de session

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetItem, getItem)

/**
 * Crear un registro (item)
 */
router.post("/", validationCreateItem, authMiddleware, checkRol([roles.admin]),/**customHeader ,*/createItem) 

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, authMiddleware, checkRol([roles.admin]), updateItem) // hace uso de dos middlewares

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, authMiddleware, checkRol([roles.admin]), deleteItem)


module.exports = router
const express = require('express')
const { getItems, getItem, createItem, deleteItem } = require('../controllers/imagenes')
const router = express.Router() // invocar a el manejador Router
const uploadMiddleware = require('../utils/handleStorage') // configuración archivo y ruta (middleware)
const validatorGetItem = require('../validators/imagenes')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')
const roles = require('../roles')

// http://localhost:3001/imagenes GET, POST, DELETE, PUT


/**
 * Subida de archivo con post item
 */ 
router.post('/', authMiddleware, checkRol([roles.admin]), /** validationCreateItem,*/ uploadMiddleware.single('myfile'), createItem) // método post para el envío de archivos 

/**
 * Listar items
 */
router.get("/", getItems)

/**
 * Obtener un item
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * Borrar un item
 */
router.delete('/:id', validatorGetItem, authMiddleware, checkRol([roles.admin]), deleteItem)

module.exports = router
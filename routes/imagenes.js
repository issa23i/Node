const express = require('express')
const { getItems, getItem, createItem, deleteItem } = require('../controllers/imagenes')
const router = express.Router() // invocar a el manejador Router
// TODO: validar imagenes const { validationCreateItem } = require('../validators/imagenes')
const uploadMiddleware = require('../utils/handleStorage') // configuración archivo y ruta (middleware)
const validatorGetItem = require('../validators/imagenes')

// TODO: http://localhost/imagenes GET, POST, DELETE, PUT


/**
 * Subida de archivo con post item
 */ 
router.post('/',  /** validationCreateItem,*/ uploadMiddleware.single('myfile'), createItem) // método post para el envío de archivos 

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
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router
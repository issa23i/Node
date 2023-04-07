const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/hoteles')
const router = express.Router() // invocar a el manejador Router
const { validationCreateItem, validationGetItem} = require('../validators/hoteles')
const customHeader = require('../middleware/customHeader')

// TODO: http://localhost:3001/hoteles GET, POST, DELETE, PUT

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
router.post("/", validationCreateItem, /**customHeader ,*/createItem) 

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, updateItem) // hace uso de dos middlewares

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, deleteItem)


module.exports = router
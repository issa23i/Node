const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/persona')
const router = express.Router()
const { validationCreateItem, validationGetItem } = require('../validators/persona')
const customHeader = require('../middleware/customHeader')

// http://localhost:3001/personas GET, POST, DELETE, PUT

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
router.post("/", validationCreateItem, /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, deleteItem)

module.exports = router

const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/resena')
const router = express.Router()
const { validationCreateResena, validationGetResena } = require('../validators/resena')
const customHeader = require('../middleware/customHeader')

// http://localhost:3001/resenas GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", getItems)

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetResena, getItem)

/**
 * Crear un registro (item)
 */
router.post("/", validationCreateResena, /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetResena, validationCreateResena, updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetResena, deleteItem)

module.exports = router

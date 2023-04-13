const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/habitacion')
const router = express.Router()
const { validationCreateItem, validationGetItem } = require('../validators/habitacion')

// http://localhost:3001/habitaciones GET, POST, DELETE, PUT

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
// TODO: Verficar que existe la imagen (id)
router.post("/", validationCreateItem, createItem)

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, updateItem)

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, deleteItem)

module.exports = router

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
// TODO: Al añadir la habitación, se tiene que actualizar la lista de habitaciones del hotel
router.post("/", validationCreateItem, createItem)

/**
 * Actualizar un registro (item)
 */
// TODO: Al actualizar la habitación, se tiene que comprobar que el id del hotel es el mismo o actualizar la lista de habitaciones del hotel
router.put('/:id', validationGetItem, validationCreateItem, updateItem)

/**
 * Borrar un registro
 */
// TODO: Al borrar una habitación, se tiene que actualizar la lista de habitaciones del hotel.
router.delete('/:id', validationGetItem, deleteItem)

module.exports = router

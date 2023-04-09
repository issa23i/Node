const express = require('express');
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/reserva');
const { validationCreateItem, validationGetItem } = require('../validators/reserva');
const customHeader = require('../middleware/customHeader');

// http://localhost:3001/reservas GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", getItems);

/**
 * Obtiene un detalle (item)
 */
router.get('/:id', validationGetItem, getItem);

/**
 * Crea un registro (item)
 */
// TODO: Al crear la reserva, validar que el id hotel e id de habitaciones existen y habitación pertenece al hotel
// TODO: Al crear la reserva, debe validar que esté disponible el hotel en estas fechas (controlador disponibilidad.js)
// TODO: Al crear la reserva, crear el campo precio que calcule, a partir de precio_habitacion
router.post("/", validationCreateItem, /**customHeader ,*/ createItem);

/**
 * Actualiza un registro (item)
 */
// La reserva no debe modificarse
// router.put('/:id', validationGetItem, validationCreateItem, updateItem);

/**
 * Borra un registro
 */
router.delete('/:id', validationGetItem, deleteItem);

module.exports = router;

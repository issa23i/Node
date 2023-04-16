const express = require('express');
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/reserva');
const { validationCreateItem, validationGetItem } = require('../validators/reserva');
const customHeader = require('../middleware/customHeader');
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')
// http://localhost:3001/reservas GET, POST, DELETE, PUT

/**
 * Lista los items
 */
// Las reservas sólo pueden ser listadas por un admin
router.get("/", authMiddleware, checkRol(['admin']),getItems);

/**
 * Obtiene un detalle (item)
 */
// Sólo puede verlas admin y el usuario que la creó (mirar controlador getItem en reserva.js)
router.get('/:id', validationGetItem,  authMiddleware, checkRol(['user', 'admin']), getItem);

/**
 * Crea un registro (item)
 */
router.post("/", validationCreateItem,  authMiddleware, checkRol(['user', 'admin']),/**customHeader ,*/ createItem);

/**
 * Actualiza un registro (item)
 */
// La reserva no debe modificarse
// router.put('/:id', validationGetItem, validationCreateItem, updateItem);

/**
 * Borra un registro
 */
// Sólo puede ser borrada por un admin
router.delete('/:id', validationGetItem, authMiddleware, checkRol(['admin']), deleteItem);

module.exports = router;

const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/kelly');
const router = express.Router();
const { validationCreateItem, validationGetItem } = require('../validators/kelly');
const customHeader = require('../middleware/customHeader');
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')

// http://localhost:3001/kelly GET, POST, DELETE, PUT

/**
 * Listar items
 */
router.get('/', authMiddleware, checkRol(['admin']), getItems);

/**
 * Obtener un detalle (item)
 * // TODO: Sólo la misma kelly creada (persona), puede ver su detalle, además del admin, hacer esta validación
 */
router.get('/:id', validationGetItem, authMiddleware, checkRol(['admin', 'kelly']), getItem);

/**
 * Crear un registro (item)
 */
router.post('/', validationCreateItem, authMiddleware, checkRol(['admin']),/**customHeader ,*/ createItem);

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, authMiddleware, checkRol(['admin']), updateItem);

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, authMiddleware, checkRol(['admin']), deleteItem);

module.exports = router;

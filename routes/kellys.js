const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/kelly');
const router = express.Router();
const { validationCreateItem, validationGetItem, validationUpdateItem } = require('../validators/kelly');
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
 * */
router.get('/:id', validationGetItem, authMiddleware, checkRol(['admin', 'kelly']), getItem);

/**
 * Crear un registro (item)
 */
router.post('/', validationCreateItem, authMiddleware, checkRol(['admin']),/**customHeader ,*/ createItem);

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationUpdateItem, authMiddleware, checkRol(['admin', 'kelly']), updateItem);

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, authMiddleware, checkRol(['admin']), deleteItem);

module.exports = router;

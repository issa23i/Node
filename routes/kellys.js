const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/kelly');
const router = express.Router();
const { validationCreateItem, validationGetItem } = require('../validators/kelly');
const customHeader = require('../middleware/customHeader');

// http://localhost:3001/kelly GET, POST, DELETE, PUT

/**
 * Listar items
 */
router.get('/', getItems);

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetItem, getItem);

/**
 * Crear un registro (item)
 */
router.post('/', validationCreateItem, /**customHeader ,*/ createItem);

/**
 * Actualizar un registro (item)
 */
router.put('/:id', validationGetItem, validationCreateItem, updateItem);

/**
 * Borrar un registro
 */
router.delete('/:id', validationGetItem, deleteItem);

module.exports = router;

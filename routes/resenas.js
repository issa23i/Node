const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/resena')
const router = express.Router()
const { validationCreateResena, validationGetResena } = require('../validators/resena')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')

// http://localhost:3001/resenas GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get("/", getItems)

/**
 * Obtener un detalle (item)
 */
router.get('/:id', validationGetResena, authMiddleware, getItem)

/**
 * Crear un registro (item)
 */
// TODO: Verificar que el cliente que está creando la reseña es el mismo de la reserva (id reserva, id persona)
// TODO: Verificar que no exista otra reseña con la misma id de reserva (poner campo id reserva como unique en modelo resereva)
// TODO: Verificar que la fecha de la reseña es posterior a la entrada al hotel (chekin)
router.post("/", validationCreateResena, authMiddleware, checkRol(['user', 'admin']), /**customHeader ,*/ createItem)

/**
 * Actualizar un registro (item)
 */
// TODO: Una resena sólo debe poder actualizarse por el usuario que la creó o el admin, hay que validar esto
router.put('/:id', validationGetResena, validationCreateResena, authMiddleware, checkRol(['user', 'admin']), updateItem)

/**
 * Borrar un registro
 */
// TODO: Una resena sólo debe poder borrarse por el usuario que la creó o el admin, hay que validar esto
router.delete('/:id', validationGetResena, authMiddleware, checkRol(['user', 'admin']), deleteItem)

module.exports = router

const express = require('express')
const router = express.Router() // invocar a el manejador Router
const {validationSearchParams , validationSearchParamsHotel} = require('../validators/buscar')
const {buscar, buscarEnHotel} = require('../controllers/buscar')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')
const roles = require('../roles')
// http://localhost:3001/api/buscar

/**
 * Listar items
 */
router.post('/', validationSearchParams, /**authMiddleware, checkRol([roles.admin, roles.user]),*/ buscar);

/**
 * Obtener un detalle (item)
 */
router.post('/:id', validationSearchParamsHotel, /**authMiddleware, checkRol([roles.admin, roles.user]),*/ buscarEnHotel)

module.exports = router
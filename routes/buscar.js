const express = require('express')
const router = express.Router() // invocar a el manejador Router
const {validationSearchParams} = require('../validators/buscar')
const {buscar, buscarEnHotel} = require('../controllers/buscar')
const authMiddleware = require('../middleware/session')
const checkRol = require('../middleware/rol')

// http://localhost:3001/api/buscar

router.get('/', validationSearchParams, authMiddleware, checkRol(['admin', 'user']), buscar);

router.get('/:id', validationSearchParams, authMiddleware, checkRol(['admin', 'user']), buscarEnHotel)

module.exports = router
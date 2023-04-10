const express = require('express')
const router = express.Router() // invocar a el manejador Router
const {validationSearchParams} = require('../validators/buscar')
const {buscar, buscarEnHotel} = require('../controllers/buscar')

// http://localhost:3001/api/buscar

// TODO: Implantar la función buscar
router.get('/', validationSearchParams, buscar);

// TODO: Implantar la función buscarEnHotel
router.get('/:id', validationSearchParams, buscarEnHotel)

module.exports = router
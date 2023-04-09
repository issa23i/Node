const express = require('express')
const router = express.Router() // invocar a el manejador Router
const {validationSearchParams} = require('../validators/buscar')
const {buscar} = require('../controllers/buscar')

// http://localhost:3001/buscar


router.get('/', validationSearchParams, buscar);



module.exports = router
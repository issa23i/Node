const express = require('express')
const { getItems, getItem, createItem } = require('../controllers/imagenes')
const router = express.Router() // invocar a el manejador Router
const uploadMiddleware = require('../utils/handleStorage') // configuración archivo y ruta (middleware)

// TODO: http://localhost/imagenes GET, POST, DELETE, PUT


// método post para el envío de archivos 
router.post('/', uploadMiddleware.single('myfile'), createItem) // método post para el envío de archivos 
router.get("/", getItems)

module.exports = router
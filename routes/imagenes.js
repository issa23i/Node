const express = require('express')
const { getItems, getItem, createItem } = require('../controllers/imagenes')
const router = express.Router() // invocar a el manejador Router
// TODO: validar imagenes const { validationCreateItem } = require('../validators/imagenes')
const uploadMiddleware = require('../utils/handleStorage') // configuración archivo y ruta (middleware)
// const validationCreateItem = require('../validators/imagenes') // no pongo validación en imágenes, al subir aún no existe url ni filename
// TODO: http://localhost/imagenes GET, POST, DELETE, PUT


// método post para el envío de archivos 
router.post('/',  /** validationCreateItem,*/ uploadMiddleware.single('myfile'), createItem) // método post para el envío de archivos 
router.get("/", getItems)

module.exports = router
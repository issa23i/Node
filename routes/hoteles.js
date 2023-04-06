const express = require('express')
const { getItems, getItem, createItem } = require('../controllers/hoteles')
const router = express.Router() // invocar a el manejador Router
const { validationCreateItem } = require('../validators/hoteles')

// TODO: http://localhost:3001/hoteles GET, POST, DELETE, PUT


router.get("/", getItems)
router.post("/", validationCreateItem ,createItem) // método post para el envío de archivos 



module.exports = router
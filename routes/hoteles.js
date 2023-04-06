const express = require('express')
const { getItems, getItem, createItem } = require('../controllers/hoteles')
const router = express.Router() // invocar a el manejador Router
const { validationCreateItem } = require('../validators/hoteles')
const customHeader = require('../middleware/customHeader')

// TODO: http://localhost:3001/hoteles GET, POST, DELETE, PUT


router.get("/", getItems)
router.post("/", validationCreateItem, customHeader ,createItem) // método post para el envío de archivos 



module.exports = router
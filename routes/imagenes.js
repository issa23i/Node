const express = require('express')
const { getItems, getItem, createItem } = require('../controllers/imagenes')
const router = express.Router()

// TODO: http://localhost/imagenes GET, POST, DELETE, PUT

router.get("/", getItems)
router.post("/", createItem)

module.exports = router
const express = require('express')
const { getItems, getItem } = require('../controllers/imagenes')
const router = express.Router()

// TODO: http://localhost/imagenes GET, POST, DELETE, PUT

router.get("/", getItems)
router.get("/:id", getItem)

module.exports = router
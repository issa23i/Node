const express = require('express')
const multer = require('multer')
const { getItems, getItem, createItem } = require('../controllers/imagenes')
const router = express.Router() // invocar a el manejador Router

// TODO: http://localhost/imagenes GET, POST, DELETE, PUT

/**
 * 
 */
const imagenes = multer.diskStorage({
    destination: function(req,file,cb) {
        const pathStorage = `${__dirname}/../imagenes`
    },
    filename: function() {}
})
/**
 * 
 */

router.get("/", getItems)
router.post("/", createItem) // método post para el envío de archivos 

module.exports = router
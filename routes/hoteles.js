const express = require('express')
const { getItems, getItem, createItem } = require('../controllers/hoteles')
const router = express.Router() // invocar a el manejador Router
/* const mongoose = require('mongoose');

const objectId = new mongoose.Types.ObjectId();
console.log(objectId);
const objectId2 = new mongoose.Types.ObjectId();
console.log(objectId2);
const objectId3 = new mongoose.Types.ObjectId();
console.log(objectId3); */

// TODO: http://localhost:3001/hoteles GET, POST, DELETE, PUT


router.get("/", getItems)
router.post("/", createItem) // método post para el envío de archivos 



module.exports = router
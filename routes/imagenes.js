const express = require('express')
const router = express.Router()

// TODO: http://localhost/imagenes GET, POST, DELETE, PUT

router.get("/", (req, res) => {
    const data = ["hola","mundo"]
    res.send({data}) // res.send({data:data})
})


module.exports = router
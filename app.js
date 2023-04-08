require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morganBody = require('morgan-body')
const loggerStream = require('./utils/handleLogger')
const dbConnect = require('./config/mongo')
const { json } = require("express")
const app = express() // instanciar la aplicación con express
app.use(cors())
app.use(express.json())
app.use(express.static('storage'))



morganBody(app,{
    noColors:true,
    stream: loggerStream,
    skip: function(req, res){
        return res.statusCode < 400
    }
})
const port = process.env.PORT || 3000

/**
 * Aquí invocamos las rutas
 */
// TODO: localhost/api/_______
app.use("/api", require("./routes"))

app.listen(port, () => { // escucha por el puerto 3000
    console.log(`http://localhost:${port}`)
})

dbConnect()
//const multer = require("multer")
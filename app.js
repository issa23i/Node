require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require('./config/mongo')
const { json } = require("express")
const app = express() // instanciar la aplicación con express
app.use(cors())
app.use(express.json())
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
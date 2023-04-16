const express = require('express')
const fs = require('fs')
const { dirname } = require('path')
const router = express.Router()
const PATH_ROUTES = __dirname


// obtener los nombres de los archivos sin .js (carga dinámica)
const removeExtension = ( fileName) => {
    return fileName.split('.').shift()
}
// leer los archivos del directorio agregar ruta añadiendo un require con cada arechivo del directorio
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router
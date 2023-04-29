const express = require('express')
const fs = require('fs')
const { dirname } = require('path')
const router = express.Router()
const PATH_ROUTES = __dirname


/**
 * Obtener los nombres de los archivos sin .js (carga dinámica) para obtener las rutas
 * @param {*} fileName El nombre del archivo del modelo
 * @returns El nombre del archivo sin la extensión
 */
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
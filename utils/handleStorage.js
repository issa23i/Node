const multer = require('multer')

/**
 * Middleware de subida de archivos usando Multer.
 * @param {*} req - Petición HTTP
 * @param {*} file - Archivo a subir
 * @param {*} cb - Función de callback para notificar la finalización de la subida
*/

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        const pathStorage = `${__dirname}/../storage` // carpeta storage donde guardar imágenes
        cb(null, pathStorage)
    },
    filename: function(req,file,cb) {
        const ext = file.originalname.split(".").pop() // recoger la extensión del archivo
        const filename = `file-${Date.now()}.${ext}` // nombre archivo file-12345678.extension
        cb(null, filename)
    }
})

const uploadMiddleware = multer({
    storage // storage: storage
})

module.exports = uploadMiddleware
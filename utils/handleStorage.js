const multer = require('multer')

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
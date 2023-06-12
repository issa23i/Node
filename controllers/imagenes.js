const fs = require('fs')
const { matchedData } = require('express-validator')
const { imagenModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`


/**
 * Obtener una lista de registros de imagen.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 */
const getItems = async (req, res) => {
    try {
        const data = await imagenModel.find({}) // devuelve una promesa
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_GET_ITEMS')
    }
}

/**
 * Obtener los detalles de un registro de imagen.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 */
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await imagenModel.findById(id) // devuelve una promesa
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_GET_ITEM')
    }
}

/**
 * Insertar un registro de imagen.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 */
const createItem = async (req, res) => { 
    try {
        const { body, file } = req // deconstruido const body = req.body

        // Verificar que el archivo sea de tipo imagen
        if (!isImageFile(file)) {
            throw new Error('El archivo seleccionado no es una imagen válida. Sólo admitidos jpg, jpeg, png y gif');
        }

        const fileData = {
            filename : file.filename,
            url : `${PUBLIC_URL}/${file.filename}`
        }
        console.log(fileData)
        const data = await imagenModel.create(fileData)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_SUBIDA_DE_ARCHIVO')
    }
}


/**
 * Eliminar un registro de imagen.
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const dataFile = await imagenModel.findById(id) 
        await imagenModel.deleteOne({_id:id}) // borra el registro que coincida con el id
        // borrar el archivo 
        const {filename} = dataFile // obtener el nombre del archivo
        const filePath = `${MEDIA_PATH}/${filename}` // ruta completa con nombre de archivo
        fs.unlinkSync(filePath) // borrar

        
        const data = {
            filePath,
            deleted:1
        }

        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_DELETE_ITEM')
    }
}

/**
 * Función para verificar si el archivo es de tipo imagen
 * @param {*} file 
 * @returns 
 */
const isImageFile = (file) => {
    // Obtener la extensión del archivo
    const extension = file.originalname.split('.').pop();

    // Verificar si la extensión es compatible con imágenes
    const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const isSupportedExtension = supportedExtensions.includes(extension.toLowerCase());

    // Verificar el tipo MIME del archivo (opcional)
    const isImageMime = file.mimetype.startsWith('image/');

    // Devolver true si la extensión y el tipo MIME son válidos
    return isSupportedExtension && isImageMime;
};

module.exports = { getItems, getItem, createItem, deleteItem }
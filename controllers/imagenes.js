const { imagenModel } = require('../models')
const PUBLIC_URL = process.env.PUBLIC_URL


/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
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
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = (req, res) => {
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => { // TODO: subida de archivos, mejorar
    try {
        const { body, file } = req // deconstruido const body = req.body
        const fileData = {
            filename : file.filename,
            url : `${PUBLIC_URL}/${file.filename}`
        }
        const data = await imagenModel.create(fileData)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_SUBIDA_DE_ARCHIVO')
    }
}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => {}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => {}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
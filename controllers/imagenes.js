const { imagenModel } = require('../models')
const PUBLIC_URL = process.env.PUBLIC_URL


/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    const data = await imagenModel.find({}) // devuelve una promesa
    res.send({data})
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
const createItem = async (req, res) => {
    const { body, file } = req // deconstruido const body = req.body
    console.log(file)
    const fileData = {
        filename : file.filename,
        url : `${PUBLIC_URL}/${file.filename}`
    }
    const data = await imagenModel.create(fileData)
    res.send({data})
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
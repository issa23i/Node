const { imagenModel } = require('../models')


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
 * @param {} req 
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
    const { body } = req
    const data = await imagenModel.create(body)
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
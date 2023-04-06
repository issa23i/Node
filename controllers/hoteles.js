const { matchedData } = require('express-validator')
const { hotelModel } = require('../models')
const {handleHttpError} = require('../utils/handleError')


/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await hotelModel.find({}) // devuelve una promesa
        res.send({data})
    } catch (e) {
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
const createItem = async (req, res) => {
    try {
        const body = matchedData(req) // recoge sólo los datos validados (carpeta validators)
        const data = await hotelModel.create(body)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_CREATE_ITEM')
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
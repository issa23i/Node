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
        // TODO: si queremos quitar user, podemos sólo con comentar const user y la variabel user en el send
        // TODO: si borramos lo anterior, borrar también en el middleware session el const user y req.user
        const user = req.user // saber quién está realizando la petición gracias a authMiddleware
        const data = await hotelModel.find({}) 
        res.send({ data, user}) // muestra los hoteles y la persona que los pidió
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_GET_ITEMS')
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await hotelModel.findById(id) 
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_GET_ITEM')
    }
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
const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) // recoge id y lo que sobra en body {id} {body}
        const data = await hotelModel.findOneAndUpdate(
            {_id: id}, // busca por id,
            body, // devuelve el cuerpo (body)
            {new: true}) // que devuelva actualizado, no el antiguo
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_UPDATE_ITEM')
    }
}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await hotelModel.deleteOne({_id:id}) // borra el registro que coincida con el id
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_DELETE_ITEM')
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
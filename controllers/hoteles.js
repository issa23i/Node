const { matchedData } = require('express-validator')
const { hotelModel } = require('../models')
const {handleHttpError} = require('../utils/handleError')


/**
 * Obtener una lista de hoteles que tienen sello
 * @param {*} req - Petición HTTP recibida
 * @param {*} res - Respuesta HTTP a enviar
 */
const getItems = async (req, res) => {
    try {
        // TODO: si queremos quitar user, podemos sólo con comentar const user y la variable user en el send
        // TODO: si borramos lo anterior, borrar también en el middleware session el const user y req.user
        // TODO: comprobar si hay más sitios donde nos interesa usar el user en la request (tres siguientes líneas)
        // const user = req.user // saber quién está realizando la petición gracias a authMiddleware
        
        // Sólo se muestran los hoteles que tienen sello
        const data = await hotelModel.find({ tieneSello: true })
        res.send({ data/**, user */}) // muestra los hoteles y la persona que los pidió
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_GET_ITEMS')
    }
}

/**
 * Obtener los detalles de un hotel por su ID
 * @param {*} req - Petición HTTP recibida
 * @param {*} res - Respuesta HTTP a enviar
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
 * Insertar un nuevo hotel en la base de datos
 * @param {*} req - Petición HTTP recibida
 * @param {*} res - Respuesta HTTP a enviar
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
 * Actualiza los detalles de un hotel existente
 * @param {*} req - Petición HTTP recibida
 * @param {*} res - Respuesta HTTP a enviar
 */
const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) // recoge id y lo que sobra en body {id} {body}
        console.log(id)
        console.log(body)
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
 * Eliminar un hotel existente de la base de datos
 * @param {*} req - Petición HTTP recibida
 * @param {*} res - Respuesta HTTP a enviar
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
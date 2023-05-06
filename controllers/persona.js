const { matchedData } = require('express-validator')
const { personaModel } = require('../models')
const {handleHttpError} = require('../utils/handleError')



/**
 * Obtener una lista de registros de personas.
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 * @throws {Error} Si hay un error al obtener los registros.
 */
const getItems = async (req, res) => {
    try {
        const data = await personaModel.find({})
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_GET_ITEMS')
    }
}

/**
 * Obtener el detalle de un registro de persona.
 * @param {*} req - Objeto de solicitud HTTP con el id del registro.
 * @param {*} res - Objeto de respuesta HTTP.
 * @throws {Error} Si hay un error al obtener el registro o si el usuario no tiene permisos para ver el contenido.
 */
const getItem = async (req, res) => {
    try{
        
    const { id } = matchedData(req);
        // con el middleware session hemos recogido al usuario que está realizando la petición
        const user = req.user;
        if(!user){
            throw new Error('ERROR_GET_USER');
        }
        const persona = await personaModel.findById(id) 

        if (persona) {
            const esMismaPersona = persona._id.toString() === user._id.toString() 
            
            if (!esMismaPersona){
              res.status(403).send({ message: 'No tiene permisos para visualizar este perfil' });
            } else {
              res.send({ persona });
            }
          }
        
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_USER')
    }
}

/**
 * Insertar un nuevo registro de persona en la base de datos.
 * @param {*} req - Objeto de solicitud HTTP con los datos del registro a insertar.
 * @param {*} res - Objeto de respuesta HTTP.
 * @throws {Error} Si hay un error al insertar el registro.
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req) // recoge sólo los datos validados (carpeta validators)
        const data = await personaModel.create(body)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_CREATE_ITEM')
    }
}

/**
 * Actualizar un registro de persona existente en la base de datos.
 * @param {*} req - Objeto de solicitud HTTP con el id del registro a actualizar y los nuevos datos.
 * @param {*} res - Objeto de respuesta HTTP.
 * @throws {Error} Si hay un error al actualizar el registro.
 */
const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) // recoge id y lo que sobra en body {id} {body}
        // con el middleware session hemos recogido al usuario que está realizando la petición
        const user = req.user;
        console.log(user._id)
        const data = await personaModel.findOneAndUpdate(
            {_id: id}, // busca por id,
            body, // devuelve el cuerpo (body)
            {new: true}) // que devuelva actualizado, no el antiguo
        data.set('password', undefined, {strict: false});
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_UPDATE_ITEM')
    }
}

/**
 * Eliminar un registro de persona existente en la base de datos.
 * @param {*} req - Objeto de solicitud HTTP con el id del registro a eliminar.
 * @param {*} res - Objeto de respuesta HTTP.
 * @throws {Error} Si hay un error al eliminar el registro.
 */
const deleteItem = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await personaModel.deleteOne({_id:id}) // borra el registro que coincida con el id
        const count = data.deletedCount // cuenta el número de registros borrados

        if (count === 1) {
            res.send({message: 'Registro eliminado exitosamente', count})
        } else {
            res.send({message: 'No se encontró ningún registro para eliminar', count})
        }
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_DELETE_ITEM')
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }

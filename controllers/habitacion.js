const { matchedData } = require('express-validator');
const { habitacionModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener una lista de habitaciones
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const getItems = async (req, res) => {
  try {
    const data = await habitacionModel.find({})
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};

/**
 * Obtener el detalle de una habitación
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await habitacionModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEM');
  }
};

/**
 * Insertar una nueva habitación
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req); // recoge sólo los datos validados (carpeta validators)
    const data = await habitacionModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_CREATE_ITEM');
  }
};


/**
 * Actualizar una habitación existente
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); // recoge id y lo que sobra en body {id} {body}
    const data = await habitacionModel.findOneAndUpdate(
      { _id: id }, // busca por id,
      body, // devuelve el cuerpo (body)
      { new: true } // que devuelva actualizado, no el antiguo
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_UPDATE_ITEM');
  }
};

/**
 * Eliminar una habitación existente
 * @param {*} req - Objeto de solicitud HTTP.
 * @param {*} res - Objeto de respuesta HTTP.
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await habitacionModel.deleteOne({ _id: id }); // borra el registro que coincida con el id
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_DELETE_ITEM');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

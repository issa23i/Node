const { matchedData } = require('express-validator');
const { precioHabitacionModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const roles = require('../roles')

/**
 * Obtener una lista de todos los registros en la base de datos de precios de habitaciones.
 * @param {*} req - La solicitud HTTP.
 * @param {*} res - La respuesta HTTP.
 */
const getItems = async (req, res) => {
  try {
    const data = await precioHabitacionModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};

/**
 * Obtener el detalle de un registro en la base de datos de precios de habitaciones.
 * @param {*} req - La solicitud HTTP.
 * @param {*} res - La respuesta HTTP.
 */
const getItem = async (req, res) => {
  try{
    req = matchedData(req);
    const { id } = req;
    const data = await precioHabitacionModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEM');
  }
};

/**
 * Insertar un nuevo registro en la base de datos de precios de habitaciones.
 * @param {*} req - La solicitud HTTP.
 * @param {*} res - La respuesta HTTP.
 */
const createItem = async (req, res) => {
  try {

    const body = matchedData(req);

    const user = req.user


    if(user.rol.toString() === roles.admin.toString()){
      const data = await precioHabitacionModel.create(body);
      res.send({ data });
    } else {
      res.status(403).send({ message: 'No tienes permisos para realizar esta acción' });
    }
    
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_CREATE_ITEM');
  }
};

/**
 * Actualizar un registro en la base de datos de precios de habitaciones.
 * @param {*} req - La solicitud HTTP.
 * @param {*} res - La respuesta HTTP.
 */
const updateItem = async (req, res) => {
  try{
    const { id, ...body } = matchedData(req);
    const user = req.user


    if(user.rol.toString() === roles.admin.toString()){
      const data = await precioHabitacionModel.findOneAndUpdate(
        { _id: id },
        body,
        { new: true }
      );
      res.send({ data });
    } else {
      res.status(403).send({ message: 'No tienes permisos para realizar esta acción' });
    }
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_UPDATE_ITEM');
  }
};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try{
    req = matchedData(req);
    const { id } = req;
    const data = await precioHabitacionModel.deleteOne({ _id: id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_DELETE_ITEM');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

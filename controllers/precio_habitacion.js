const { matchedData } = require('express-validator');
const { precioHabitacionModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
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
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
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
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await precioHabitacionModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_CREATE_ITEM');
  }
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
  try{
    const { id, ...body } = matchedData(req);
    const data = await precioHabitacionModel.findOneAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    res.send({ data });
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

const { matchedData } = require('express-validator');
const { resenaModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener una lista de reseñas
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const data = await resenaModel.find({})
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};

/**
 * Obtener una reseña por id
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await resenaModel.findById(id)
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEM');
  }
};

/**
 * Crear una nueva reseña
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await resenaModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_CREATE_ITEM');
  }
};

/**
 * Actualizar una reseña existente
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await resenaModel.findOneAndUpdate(
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
 * Eliminar una reseña por id
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await resenaModel.deleteOne({ _id: id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_DELETE_ITEM');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

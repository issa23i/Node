const { matchedData } = require('express-validator');
const { kellyModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const tieneSello = require('../utils/handleSelloHotel')

/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const data = await kellyModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await kellyModel.findById(id);
    res.send({ data });
  } catch (error) {
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
    const body = matchedData(req); // recoge sólo los datos validados (carpeta validators)
    const data = await kellyModel.create(body);

    // actualizar el sello del hotel con la puntuación de la kelly creada
    const hotelId = data.hotel
    tieneSello(hotelId)

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_EN_CREATE_ITEM');
  }
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req); // recoge id y lo que sobra en body {id} {body}
    const data = await kellyModel.findOneAndUpdate(
      { _id: id }, // busca por id,
      body, // devuelve el cuerpo (body)
      { new: true } // que devuelva actualizado, no el antiguo
    );

    // actualizar el sello del hotel con la puntuación de la kelly actualizada
    const hotelId = data.hotel
    tieneSello(hotelId)

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_EN_UPDATE_ITEM');
  }
};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await kellyModel.findOneAndDelete({ _id: id }); // borra el registro que coincida con el id
    
    // actualizar el sello del hotel borrando la puntuación de la kelly eliminada
    const hotelId = data.hotel
    tieneSello(hotelId)
    
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_EN_DELETE_ITEM');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

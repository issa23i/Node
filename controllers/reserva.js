const { matchedData } = require('express-validator');
const { reservaModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener una lista de reservas
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
  try {
    const data = await reservaModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};

/**
 * Obtener una reserva
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    
    
    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;
    const reserva = await reservaModel.findById(id);
    
    if (reserva) {
      const esCliente = reserva.cliente.toString() === user._id.toString()
      
      if (!esCliente){
        res.status(403).send({ message: 'No puede visualizar una reserva que no pertenece al cliente' });
      } else {
        res.send({ reserva });
      }
    }
    
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEM');
  }
};

/**
 * Crear una reserva
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await reservaModel.create(body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_CREATE_ITEM');
  }
};

/**
 * Actualizar una reserva
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await reservaModel.findOneAndUpdate(
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
 * Eliminar una reserva
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await reservaModel.deleteOne({ _id: id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_DELETE_ITEM');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

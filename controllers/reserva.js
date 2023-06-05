const { matchedData } = require('express-validator');
const { reservaModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener una lista de todas las reservas.
 * @param {*} req - La petición HTTP.
 * @param {*} res - La respuesta HTTP.
 */
const getItems = async (req, res) => {
  try {
    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;
    if(user){
      if(user.rol !== 'admin'){
        throw new Error('Permiso denegado');
      }
    } else {
      throw new Error('Permiso denegado');
    }
    const data = await reservaModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};

/**
 * Obtener una lista de todas las reservas.
 * @param {*} req - La petición HTTP.
 * @param {*} res - La respuesta HTTP.
 */
const getItemsByUser = async (req, res) => {
  try {
    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;
    if(!user){
      throw new Error('Permiso denegado');
    }
    // buscamos sus reservas
    const data = await reservaModel.find({ cliente: user._id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_GET_ITEMS');
  }
};



/**
 * Obtener una reserva específica por su ID.
 * @param {*} req - La petición HTTP que contiene el ID de la reserva.
 * @param {*} res - La respuesta HTTP.
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
 * Crea una nueva reserva en la base de datos.
 * @param {*} req - La petición HTTP que contiene los datos de la nueva reserva.
 * @param {*} res - La respuesta HTTP.
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
 * Actualiza una reserva existente en la base de datos.
 * @param {*} req - La petición HTTP que contiene el ID de la reserva y los datos actualizados.
 * @param {*} res - La respuesta HTTP.
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
 * Elimina una reserva existente en la base de datos.
 * @param {*} req - La petición HTTP que contiene el ID de la reserva que se eliminará.
 * @param {*} res - La respuesta HTTP.
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

module.exports = { getItems, getItemsByUser, getItem, createItem, updateItem, deleteItem };

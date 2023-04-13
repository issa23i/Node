const { matchedData } = require('express-validator');
const { resenaModel, hotelModel, reservaModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const setPuntuacionHotel = require('../utils/handlePuntuacionHotel')


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

    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;

    // Obtener el objeto de la reserva actual
    const reservaId = data.reserva
    const reserva = await reservaModel.findById(reservaId);

    const data = await resenaModel.findById(id)
    res.send({ data, user }); // <-- Devolver también el objeto de usuario autenticado

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

    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;

    const data = await resenaModel.create(body);

    // Obtener el objeto de la reserva actual
    const reservaId = data.reserva
    const reserva = await reservaModel.findById(reservaId);

    // Verificar que el usuario autenticado sea el mismo que realizó la reserva
        // gracias al middleware session
    if (reserva.cliente.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'El usuario no tiene permisos para crear una reseña para esta reserva.' });
    }

    // Obtener el ID del hotel de la reserva
    const hotelId = reserva.hotel;

    // Actualizar puntuación del hotel teniendo en cuenta todas las reseñas, incluída la última
    setPuntuacionHotel(hotelId)

    res.send({ data, user });// <-- Devolver también el objeto de usuario autenticado
  } catch (e) {
    console.log(e)
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

    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;
    
    // Verificar que el usuario autenticado sea el mismo que realizó la reserva
        // gracias al middleware session
        if (reserva.cliente.toString() !== user._id.toString()) {
          return res.status(403).json({ error: 'El usuario no tiene permisos para crear una reseña para esta reserva.' });
        }


    const data = await resenaModel.findOneAndUpdate(
      { _id: id }, // busca por id,
      body, // devuelve el cuerpo (body)
      { new: true } // que devuelva actualizado, no el antiguo
    );

    // Obtener el objeto de la reserva actual
    const reservaId = data.reserva
    const reserva = await reservaModel.findById(reservaId);

    // Obtener el ID del hotel de la reserva
    const hotelId = reserva.hotel;

    // Actualizar puntuación del hotel teniendo en cuenta todas las reseñas, incluída esta actualización
    await setPuntuacionHotel(hotelId);

    res.send({ data, user });// <-- Devolver también el objeto de usuario autenticado
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
    const data = await resenaModel.findOneAndDelete({ _id: id });
       
    // con el middleware session hemos recogido al usuario que está realizando la petición
    const user = req.user;

    // Verificar que el usuario autenticado sea el mismo que realizó la reserva
        // gracias al middleware session
        if (reserva.cliente.toString() !== user._id.toString()) {
          return res.status(403).json({ error: 'El usuario no tiene permisos para crear una reseña para esta reserva.' });
        }

    // Obtener el objeto de la reserva actual
    const reservaId = data.reserva
    const reserva = await reservaModel.findById(reservaId);

    // Obtener el ID del hotel de la reserva
    const hotelId = reserva.hotel;

    // Actualizar puntuación del hotel teniendo en cuenta todas las reseñas, incluída esta actualización
    await setPuntuacionHotel(hotelId);


    res.send({ data, user }); // <-- Devolver también el objeto de usuario autenticado
  } catch (e) {
    handleHttpError(res, 'ERROR_EN_DELETE_ITEM');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

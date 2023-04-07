const fs = require('fs')
const { matchedData } = require('express-validator')
const { imagenModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`


/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await imagenModel.find({}) // devuelve una promesa
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_GET_ITEMS')
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await imagenModel.findById(id) // devuelve una promesa
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_GET_ITEM')
    }
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => { // TODO: subida de archivos, mejorar
    try {
        const { body, file } = req // deconstruido const body = req.body
        const fileData = {
            filename : file.filename,
            url : `${PUBLIC_URL}/${file.filename}`
        }
        const data = await imagenModel.create(fileData)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_EN_SUBIDA_DE_ARCHIVO')
    }
}


/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const dataFile = await imagenModel.findById(id) 
        await imagenModel.deleteOne({_id:id}) // borra el registro que coincida con el id
        // borrar el archivo 
        const {filename} = dataFile // obtener el nombre del archivo
        const filePath = `${MEDIA_PATH}/${filename}` // ruta completa con nombre de archivo
        fs.unlinkSync(filePath) // borrar

        
        const data = {
            filePath,
            deleted:1
        }

        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_EN_DELETE_ITEM')
    }
}

module.exports = { getItems, getItem, createItem, deleteItem }
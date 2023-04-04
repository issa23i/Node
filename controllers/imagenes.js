/**
 * Obtener una lista
 * @param {*} req 
 * @param {*} res 
 */
const getItems = (req, res) => {
    const data = ["hola","mundo"]
    res.send({data}) // res.send({data:data})
}

/**
 * Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getItem = (req, res) => {}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = (req, res) => {}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => {}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => {}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }
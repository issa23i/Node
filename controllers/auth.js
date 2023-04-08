const { matchedData } = require('express-validator')
const { encrypt, compare} = require('../utils/handlePassword')
const {tokenSign} = require('../utils/handleJwt')
const { personaModel } = require('../models')
const { handleHttpError } =require('../utils/handleError')

/**
 * Controlador que registra un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerController = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password) // coge el password del request y lo hashea
        const body = {...req, password} // recoge el req y sobreescribe el password ya hasheado
        const dataUser = await personaModel.create(body) // crea un nueva persona en la base de datos
        dataUser.set("password", undefined, {strict: false}) // hacer que la data no contenga el password

        const data = {
            token:await tokenSign(dataUser), // Devuelve la firma
            user:dataUser // Objeto usuario
        }
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'HUBO_UN_ERROR_EN_EL_REGISTRO')
    }
}

/**
 * Controlador que loguea a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try {
        req = matchedData(req) // curar la request
        const user = await personaModel
            .findOne({email:req.email}) // encontrar al usuario con ese email
            .select('nombre email password rol') // selecciona los campos que necesitamos 

        if (! user ) {
            handleHttpError(res, 'ERROR_DE_AUTENTICACION', 401) // Código no autorización
            return
        }

        // el usuario existe, comprobar contraseña
        const hashPassword = user.get('password')
        const check = await compare(req.password, hashPassword)

        if (!check){
            handleHttpError(res, 'ERROR_DE_AUTENTICACION', 401) // Código no autorización
            return
        }

        user.set('password', undefined, {strict:false}) // no queremos que muestre la contraseña, una vez validada

        // usuario y contraseña coinciden, verificar firma
        const data = {
            token:await tokenSign(user), // Devuelve la firma
            user // user:user Objeto usuario
        }

        res.send({data})

    } catch (e) {
        handleHttpError(res, 'ERROR_DE_AUTENTICACION')
    }
}


module.exports = {registerController, loginController}
const { verifyToken } = require('../utils/handleJwt')
const { personaModel } = require('../models')


/**
 * Middleware para autenticar y autorizar peticiones HTTP. Verifica la existencia y validez del token de autorización
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función que llama al siguiente middleware en la cadena
 * @throws {Error} - Si el token de autorización no es válido o no existe en la petición, se devuelve un error 401
*/
const authMiddleware = async ( req, res, next ) => {
    const { handleHttpError } = require('../utils/handleError')
    
    try {
        if( ! req.headers.authorization ) { // si no existe en el encabezado autorización
            handleHttpError( res, 'SESION_NO_INICIADA', 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken( token ) // comprueba que el token es correcto y firmado

        if ( ! dataToken._id ) {
            handleHttpError( res, 'SESION_NO_INICIADA', 401)
            return
        }

        // TODO: Comentar las siguientes dos línes si NO nos interesa saber qué usuario realiza la consulta
                // para usar, hay que añadir al controlador const user = req.user; y en la respuesta res.send({ data, user })
        const user = await personaModel.findById(dataToken._id) // para saber la persona que está en la sesion  
        req.user = user // inyectamos en la petición al usuario

        next() // Dejar pasar a esta persona

    } catch (e) {
        handleHttpError( res, 'SESION_NO_INICIADA', 401)
    }
}

module.exports = authMiddleware 
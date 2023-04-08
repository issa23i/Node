const { verifyToken } = require('../utils/handleJwt')
const { personaModel } = require('../models')

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

        const user = await personaModel.findById(dataToken._id) // para saber la persona que está en la sesion  
        req.user = user // inyectamos en la petición al usuario

        next() // Dejar pasar a esta persona

    } catch (e) {
        handleHttpError( res, 'SESION_NO_INICIADA', 401)
    }
}

module.exports = authMiddleware 
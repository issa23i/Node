const { handleHttpError } = require('../utils/handleError')


/**
 * Pasar array con los roles permitidos
 * @param {*} roles 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => { // doble argumento 
    try {
        const {user} = req // user fué inyectado en el req, en el middleware session. Aquí lo recuperamos
        
        const rolByUser = user.rol
        
        // verificar que el usuario tiene el rol permitido
        const checkValueRol = roles.some( (rolSingle) => rolByUser.includes(rolSingle)) // booleano
        if ( ! checkValueRol ) {
            handleHttpError(res, 'ERROR_PERMISOS_REQUERIDOS', 403)
            return 
        }

        next()
    } catch (e) {
        handleHttpError(res, 'ERROR_PERMISOS_REQUERIDOS', 403)
    }
}

module.exports = checkRol
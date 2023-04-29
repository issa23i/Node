/**
 * Manejar errores HTTP
 * @param {*} res  El objeto de respuesta HTTP
 * @param {string} message - El mensaje de error (opcional)
 * @param {number} code - El código de error HTTP (por defecto 403)
 */
const handleHttpError = (res, message = 'Algo sucedió', code = 403) => {
    res.status(code)
    res.send({error:message})
}

module.exports = {handleHttpError}

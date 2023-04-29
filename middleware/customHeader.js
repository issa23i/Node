/**
 * Middleware para validar una API key
 * @param {*} req - Petición HTTP
 * @param {*} res - Respuesta HTTP
 * @param {*} next - Función que se llama para pasar al siguiente middleware
*/
const customHeader = (req, res, next) => {
    try {
        // TODO: descomentar para solicitar una api key pública en la API
        /** 
        const apiKey = req.headers.api_key
        if(apiKey === 'api-publica-123'){
            next()
        } else {
            res.status(403)
            res.send({error:'API_KEY_INVALIDA'})
        }*/
        next()
    } catch (err) {
        res.status(403)
        res.send({error:'ALGO_OCURRIO_EN_EL_CUSTOM_HEADER'})
    }
}


module.exports = customHeader
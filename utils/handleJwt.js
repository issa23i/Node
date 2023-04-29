const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Genera un token JWT firmado para un usuario dado.
 * @param {Object} user - Objeto que representa al usuario.
 * @returns {string} - Token JWT firmado.
 */
const tokenSign = async (user) => {
    // Firmar, generar el token
    const sign = jwt.sign({
        _id : user._id,
        role: user.role
    },
    JWT_SECRET, {
        expiresIn: '2h'
    }
    )
    return sign
}

/**
 * Verifica un token JWT dado y devuelve la carga útil decodificada si es válido.
 * @param {string} tokenJWT - Token JWT a verificar.
 * @returns {Object|null} - Objeto que representa la carga útil decodificada o null si el token es inválido.
 */
const verifyToken = async (tokenJWT) => {
    try {
        return jwt.verify(tokenJWT, JWT_SECRET)
    } catch (e) {
        return null
    }
}
module.exports = {tokenSign,verifyToken}
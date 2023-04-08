const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Pasar el objeto usuario
 * @param {*} user 
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
 * Pasar el token de session
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJWT) => {
    // Verificar token
    try {
        return jwt.verify(tokenJWT, JWT_SECRET)
    } catch (e) {
        return null
    }
}
module.exports = {tokenSign,verifyToken}
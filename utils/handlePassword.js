const bcryptjs = require('bcryptjs')

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    // hash encriptado a partir de un texto plano
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}

/**
 * Contraseña sin encriptar y contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    // compara hash con texto plano y dice si es correcto o no
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }
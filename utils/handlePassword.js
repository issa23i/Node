const bcryptjs = require('bcryptjs')

/**
 * Función para encriptar una contraseña
 * @param {*} passwordPlain - Contraseña sin encriptar
 * @returns {Promise<string>} - Contraseña encriptada
 */
const encrypt = async (passwordPlain) => {
    // hash encriptado a partir de un texto plano
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}

/**
 * Función para comparar una contraseña en texto plano con una contraseña encriptada
 * @param {*} passwordPlain - Contraseña sin encriptar
 * @param {*} hashPassword - Contraseña encriptada
 * @returns {Promise<boolean>} - Verdadero si las contraseñas son iguales, falso si no lo son
 */
const compare = async (passwordPlain, hashPassword) => {
    // compara hash con texto plano y dice si es correcto o no
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }
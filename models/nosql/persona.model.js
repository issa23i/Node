/**
 * Esquema de Persona para la base de datos.
 * @typedef {Object} Persona
 * @property {string} nif - NIF de la persona (clave única, requerido)
 * @property {string} nombre - Nombre de la persona (requerido)
 * @property {string} apellido1 - Primer apellido de la persona (requerido)
 * @property {string} [apellido2] - Segundo apellido de la persona (opcional)
 * @property {string} email - Correo electrónico de la persona (clave única, requerido)
 * @property {string} password - Contraseña de la persona (requerido, no se muestra en las consultas)
 * @property {string} rol - Rol de la persona ('admin', 'user' o 'kelly', por defecto 'user', requerido)
 * @property {Date} createdAt - Fecha de creación del registro (autogenerado)
 * @property {Date} updatedAt - Fecha de actualización del registro (autogenerado)
 */

const mongoose = require('mongoose');
const roles = require('../../roles')
// crea un nuevo array de roles a partir del objeto roles
const rolesPermitidos = [...roles.admin, ...roles.user, ...roles.kelly]

/**
 * Esquema de Persona para la base de datos.
 * @type {personaSchema}
 */
const personaSchema = new mongoose.Schema({
  nif: {
    type: String,
    unique: true,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido1: {
    type: String,
    required: true
  },
  apellido2: {
    type: String
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true,
    select: false // en false, no se mostrará la contraseña en las consultas
  },
  rol: {
    type: String,
    enum: rolesPermitidos,
    default: 'user',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Persona', personaSchema);

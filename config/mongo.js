const mongoose = require("mongoose");

/**
 * Conexión a la base de datos de MongoDB
 * 
 * @function
 * 
 * @async
 * 
 * @param {string} DB_URI - URI de la base de datos
 * 
 * @throws {error} Si ocurre un error al acceder a MongoDB
 * 
 * @returns {Promise<void>}
 */
const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Conexión realizada con éxito con MongoDB a la Base de Datos :', mongoose.connection.db.databaseName);
  } catch (err) {
    console.error('Ocurrió un erro al acceder a MongoDB: ', err)
  }
};

module.exports = dbConnect;

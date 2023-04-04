
///////////////////


// Schema base para todos los usuarios
const UserSchema = new mongoose.Schema({
    dni: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    apellido1: {
      type: String
    },
    apellido2: {
      type: String
    },
    password: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'kelly'],
      default: 'user'
    }
  }, {
    timestamps: true, // TODO: createAt, updateAt
    versionKey: false
  });
  
  // Schema para los usuarios tipo Kelly
  const KellySchema = new mongoose.Schema({
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hotels'
    }
  });
  
  // Definimos la herencia
  const Kelly = mongoose.model('kellys', KellySchema, 'users');
  Kelly.discriminator('kelly', UserSchema);
  
  const User = mongoose.model('users', UserSchema);
  
  // Schema para los usuarios tipo Admin
  const AdminSchema = new mongoose.Schema({});
  const Admin = User.discriminator('admin', AdminSchema);
  
  // Schema para los usuarios tipo Cliente
  const ClientSchema = new mongoose.Schema({});
  const Client = User.discriminator('client', ClientSchema);
  
  module.exports = {
    User,
    Kelly,
    Admin,
    Client
  };
  
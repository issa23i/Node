const mongoose = require ('mongoose')

const UserScheme = new mongoose.Schema({
    dni:{
        type: String,
        unique: true
    },
    name:{
        type: String,
    },
    apellido1:{
        type: String,
    },
    apellido2:{
        type: String,
    },
    password:{
        type: String
    },
    role:{
        type: ['user','admin','kelly'],
        default: 'user'
    },
},
{
    timestamps: true, // TODO: createAt, updateAt
    versionKey: false
})

module.exports = mongoose.model('users', UserScheme)

const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const Usuario = sequelize.define("usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'El email debe tener un formato válido',
      },
      notEmpty: {
        msg: 'El email no puede estar vacío',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("ADMIN", "USER"),
    defaultValue: "USER",
  },
  foto_perfil: {
    type: DataTypes.STRING,
    defaultValue: "uploads/perfiles/default.png",
  },
  reset_token: {
    type: DataTypes.STRING,
  },
  token_expira: {
    type: DataTypes.DATE,
  },
},{
  timestamps: false
});


module.exports = Usuario;

const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');
const Usuario = require('./usuario');

const Clases = sequelize.define("clases", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // 🔥 evita repetidos en BD
  },
  profesor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
});

// Asociación con Usuario
Clases.belongsTo(Usuario, { foreignKey: 'profesor_id', as: 'profesor' });

module.exports = Clases;
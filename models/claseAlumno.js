const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const ClaseAlumno = sequelize.define("clase_alumnos", {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
});

module.exports = ClaseAlumno;
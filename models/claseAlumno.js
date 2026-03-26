const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');
const Usuario = require('./usuario');
const Clases = require('./clases');

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

// Asociaciones para consultas con include
ClaseAlumno.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
ClaseAlumno.belongsTo(Clases, { foreignKey: 'clase_id', as: 'clase' });

module.exports = ClaseAlumno;
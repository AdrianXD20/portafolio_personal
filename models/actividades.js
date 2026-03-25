const { DataTypes } = require("sequelize");
const sequelize= require('../database/conexion');
const Clases = require('./clases');

const Actividades = sequelize.define("actividades", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  estado: {
    type: DataTypes.STRING,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario',
      key: 'id',
    },
  },
  proyecto_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'proyecto',
      key: 'id',
    },
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Opcional, si no todas las actividades están en clases
    references: {
      model: 'clases',
      key: 'id',
    },
  }
},{
  timestamps: false
});

// Asociación con Clases
Actividades.belongsTo(Clases, { foreignKey: 'clase_id', as: 'clase' });

module.exports = Actividades;
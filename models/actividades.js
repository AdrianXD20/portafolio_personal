const { DataTypes } = require("sequelize");
const sequelize= require('../database/conexion');

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
    allowNull: false,
    references: {
      model: 'proyecto',
      key: 'id',
    },
  }
},{
  timestamps: false
});

module.exports = Actividades;
const { DataTypes } = require("sequelize");
const sequelize= require('../database/conexion');

const Experiencias = sequelize.define("experiencias", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
  },
  fecha_fin: {
    type: DataTypes.DATE,
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

module.exports = Experiencias;
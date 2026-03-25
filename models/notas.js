const { DataTypes } = require("sequelize");
const sequelize= require('../database/conexion');

const Nota = sequelize.define("notas", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
  },
  fecha: {
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

module.exports = Nota;
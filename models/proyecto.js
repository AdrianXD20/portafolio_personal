const { DataTypes } = require("sequelize");
const sequelize = require("../database/conexion.js") ;

const Proyecto = sequelize.define("proyecto", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  usuario_id:{
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'usuario', 
      key: 'id', 
    },
  },
},{
  timestamps: false
});

module.exports = Proyecto;
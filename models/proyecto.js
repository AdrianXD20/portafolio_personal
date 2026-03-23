import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Proyecto = sequelize.define("proyecto", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
});
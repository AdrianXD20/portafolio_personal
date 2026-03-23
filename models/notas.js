import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Nota = sequelize.define("Nota", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
  },
});
import { Proyecto } from "../models/proyecto.js";

// Crear proyecto
export const crearProyecto = async (data) => {
  return await Proyecto .create(data);
};

// Obtener todas
export const obtenerProyectos = async () => {
  return await Proyecto.findAll();
};

// Obtener por ID
export const obtenerProyectoPorId = async (id) => {
  return await Proyecto.findByPk(id);
};

// Actualizar
export const actualizarProyecto = async (id, data) => {
  const proyecto = await Proyecto.findByPk(id);
  if (!proyecto) return null;

  await proyecto.update(data);
  return proyecto;
};

// Eliminar
export const eliminarProyecto = async (id) => {
  const proyecto = await Proyecto.findByPk(id);
  if (!proyecto) return null;

  await proyecto.destroy();
  return true;
};
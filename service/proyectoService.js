const Proyecto = require("../models/proyecto.js");

class ProyectoService {
 
// Crear proyecto
    async crearProyecto(nuevoProyecto)  {
    return Proyecto.create(nuevoProyecto);
    }

// Obtener todas
  async obtenerProyectos()  {
    return Proyecto.findAll();
  }

// Obtener por ID
  async obtenerProyectoPorId(id) {
    return Proyecto.findByPk(id);
  }

// Actualizar
  async actualizarProyecto(id, data)  {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) return null;

    await proyecto.update(data);
    return proyecto;
  }

// Eliminar
  async eliminarProyecto(id)  {
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) return null;

    await proyecto.destroy();
    return true;
  }
}

module.exports =ProyectoService;
const Actividades = require("../models/actividades.js");

class ActividadService {
 
// Crear actividad
    async crearActividad(nuevaActividad)  {
    return Actividades.create(nuevaActividad);
    }

// Obtener todas
  async obtenerActividades()  {
    return Actividades.findAll();
  }

// Obtener por ID
  async obtenerActividadPorId(id) {
    return Actividades.findByPk(id);
  }

// Actualizar
  async actualizarActividad(id, data)  {
    const actividad = await Actividades.findByPk(id);
    if (!actividad) return null;

    await actividad.update(data);
    return actividad;
  }

// Eliminar
  async eliminarActividad(id)  {
    const actividad = await Actividades.findByPk(id);
    if (!actividad  ) return null;

    await actividad.destroy();
    return true;
  }
}

module.exports = ActividadService;
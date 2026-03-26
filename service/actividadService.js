const Actividades = require("../models/actividades.js");
const ClaseAlumno = require("../models/claseAlumno.js");
const Proyectos = require("../models/proyecto.js");
const Clases = require("../models/clases.js");

class ActividadService {
 
// 🔥 Crear actividad (MEJORADO)
async crearActividad(nuevaActividad, usuario_id) {

  // 🔐 validar clase (si viene)
  if (nuevaActividad.clase_id) {
    const pertenece = await ClaseAlumno.findOne({
      where: {
        usuario_id,
        clase_id: nuevaActividad.clase_id
      }
    });

    if (!pertenece) {
      return { error: "No perteneces a esta clase" };
    }
  }

  // 🔐 validar proyecto (si viene)
  if (nuevaActividad.proyecto_id) {
    const proyecto = await Proyectos.findByPk(nuevaActividad.proyecto_id);

    if (!proyecto || proyecto.usuario_id !== usuario_id) {
      return { error: "Proyecto inválido" };
    }
  }

  return await Actividades.create({
    ...nuevaActividad,
    usuario_id
  });
}


// 🔥 Obtener todas (sin romper tu lógica)
async obtenerActividades() {
  return Actividades.findAll();
}


// 🔥 Obtener por ID (sin romper)
async obtenerActividadPorId(id, usuario_id) {
  const actividad = await Actividades.findByPk(id);
  if (!actividad) return null;

  if (actividad.usuario_id !== usuario_id) {
    return { error: "No autorizado" };
  }

  return actividad;
}


// 🔥 Obtener por clase (NUEVO 🔥)
async obtenerActividadesPorClase(clase_id, usuario_id) {
  const clase = await Clases.findByPk(clase_id);
  if (!clase) {
    return { error: "Clase no encontrada" };
  }

  if (clase.profesor_id !== usuario_id) {
    const pertenece = await ClaseAlumno.findOne({
      where: { usuario_id, clase_id }
    });

    if (!pertenece) {
      return { error: "No autorizado" };
    }
  }

  return Actividades.findAll({ where: { clase_id } });
}


// 🔥 Obtener por proyecto (NUEVO 🔥)
async obtenerActividadesPorProyecto(proyecto_id, usuario_id) {

  const proyecto = await Proyectos.findByPk(proyecto_id);

  if (!proyecto || proyecto.usuario_id !== usuario_id) {
    return { error: "No autorizado" };
  }

  return Actividades.findAll({ where: { proyecto_id } });
}


// 🔥 Obtener personales (NUEVO 🔥)
async obtenerActividadesPersonales(usuario_id) {
  return Actividades.findAll({
    where: {
      usuario_id,
      clase_id: null
    }
  });
}


// 🔥 Actualizar (MEJORADO)
async actualizarActividad(id, data, usuario_id) {
  const actividad = await Actividades.findByPk(id);
  if (!actividad) return null;

  // 🔐 solo dueño
  if (actividad.usuario_id !== usuario_id) {
    return { error: "No autorizado" };
  }

  // 🔐 validar clase nueva (si cambia)
  if (data.clase_id) {
    const pertenece = await ClaseAlumno.findOne({
      where: {
        usuario_id,
        clase_id: data.clase_id
      }
    });

    if (!pertenece) {
      return { error: "No perteneces a esa clase" };
    }
  }

  // 🔐 validar proyecto
  if (data.proyecto_id) {
    const proyecto = await Proyectos.findByPk(data.proyecto_id);

    if (!proyecto || proyecto.usuario_id !== usuario_id) {
      return { error: "Proyecto inválido" };
    }
  }

  await actividad.update(data);
  return actividad;
}


// 🔥 Eliminar (MEJORADO)
async eliminarActividad(id, usuario_id) {
  const actividad = await Actividades.findByPk(id);
  if (!actividad) return null;

  if (actividad.usuario_id !== usuario_id) {
    return { error: "No autorizado" };
  }

  await actividad.destroy();
  return true;
}

  // 🔥 Obtener todas las actividades del usuario
  async obtenerActividadesPorUsuario(usuario_id) {
    return Actividades.findAll({ where: { usuario_id } });
  }

}

module.exports = ActividadService;
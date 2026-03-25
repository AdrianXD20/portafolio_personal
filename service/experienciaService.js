const Experiencia = require("../models/experiencias.js");

class ExperienciaService {
 
// Crear experiencia
    async crearExperiencia(nuevaExperiencia)  {
    return Experiencia.create(nuevaExperiencia);
    }

// Obtener todas
  async obtenerExperiencias()  {
    return Experiencia.findAll();
  }

// Obtener por ID
  async obtenerExperienciaPorId(id) {
    return Experiencia.findByPk(id);
  }

// Actualizar
  async actualizarExperiencia(id, data)  {
    const experiencia = await Experiencia.findByPk(id);
    if (!experiencia) return null;

    await experiencia.update(data);
    return experiencia;
  }

// Eliminar
  async eliminarExperiencia(id)  {
    const experiencia = await Experiencia.findByPk(id);
    if (!experiencia) return null;

    await experiencia.destroy();
    return true;
  }
}

module.exports = ExperienciaService;
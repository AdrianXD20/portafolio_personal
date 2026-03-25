const Logro = require("../models/logros.js");

class LogroService {
 
// Crear logro
    async crearLogro(nuevoLogro)  {
    return Logro.create(nuevoLogro);
    }

// Obtener todas
  async obtenerLogros()  {
    return Logro.findAll();
  }

// Obtener por ID
  async obtenerLogroPorId(id) {
    return Logro.findByPk(id);
  }

// Actualizar
  async actualizarLogro(id, data)  {
    const logro = await Logro.findByPk(id);
    if (!logro) return null;

    await logro.update(data);
    return logro;
  }

// Eliminar
  async eliminarLogro(id)  {
    const logro = await Logro.findByPk(id);
    if (!logro) return null;

    await logro.destroy();
    return true;
  }
}

module.exports =LogroService;
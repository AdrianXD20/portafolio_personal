const Nota = require("../models/notas.js");

class NotaService {
 
// Crear nota
    async crearNota(nuevaNota)  {
    return Nota.create(nuevaNota);
    }

// Obtener todas
  async obtenerNotas()  {
    return Nota.findAll();
  }

// Obtener por ID
  async obtenerNotaPorId(id) {
    return Nota.findByPk(id);
  }

// Actualizar
  async actualizarNota(id, data)  {
    const nota = await Nota.findByPk(id);
    if (!nota) return null;

    await nota.update(data);
    return nota;
  }

// Eliminar
  async eliminarNota(id)  {
    const nota = await Nota.findByPk(id);
    if (!nota) return null;

    await nota.destroy();
    return true;
  }
}

module.exports =NotaService;
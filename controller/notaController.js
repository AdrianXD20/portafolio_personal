class NotaController {
  constructor(notaService) {
    this.notaService = notaService;
  }

  async crearNota(req, res) {
    try {
      const nuevaNota = req.body;
      const nota = await this.notaService.crearNota(nuevaNota);
      return res.status(201).json(nota);
    } catch (error) {
      console.error('Error creando nueva nota:', error);
      res.status(500).json({ message: 'Error al crear la nota', error: error.message });
    }
  }

  async obtenerNotas(req, res) {
    try {
      const notas = await this.notaService.obtenerNotas();
      res.status(200).json(notas);
    } catch (error) {
      console.error('Error al obtener notas:', error);
      res.status(500).json({ message: 'Error al obtener las notas', error: error.message });
    }
  }

  async obtenerNotaPorId(req, res) {
    try {
      const id = req.params.id;
      const nota = await this.notaService.obtenerNotaPorId(id);
      if (!nota) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      return res.status(200).json(nota);
    } catch (error) {
      console.error('Error al obtener nota por ID:', error);
      res.status(500).json({ message: 'Error al obtener la nota', error: error.message });
    }
  }

  async actualizarNota(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const nota = await this.notaService.actualizarNota(id, datosActualizados);
      if (!nota) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      res.status(200).json(nota);
    } catch (error) {
      console.error('Error al actualizar nota:', error);
      res.status(500).json({ message: 'Error al actualizar la nota', error: error.message });
    }
  }

  async eliminarNota(req, res) {
    try {
      const id = req.params.id;
      const resultado = await this.notaService.eliminarNota(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Nota no encontrada ' });
      }
      res.status(200).json({ message: 'Nota eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar nota:', error);
      res.status(500).json({ message: 'Error al eliminar la nota', error: error.message });
    }
  }
}

module.exports = NotaController;

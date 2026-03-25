class LogroController {
  constructor(logroService) {
    this.logroService = logroService;
  }

  async crearLogro(req, res) {
    try {
      const nuevoLogro = req.body;
      const logro = await this.logroService.crearLogro(nuevoLogro);
      return res.status(201).json(logro);
    } catch (error) {
      console.error('Error creando nuevo logro:', error);
      res.status(500).json({ message: 'Error al crear el logro', error: error.message });
    }
  }

  async obtenerLogros(req, res) {
    try {
      const logros = await this.logroService.obtenerLogros();
      res.status(200).json(logros);
    } catch (error) {
      console.error('Error al obtener logros:', error);
      res.status(500).json({ message: 'Error al obtener los logros', error: error.message });
    }
  }

  async obtenerLogroPorId(req, res) {
    try {
      const id = req.params.id;
      const logro = await this.logroService.obtenerLogroPorId(id);
      if (!logro) {
        return res.status(404).json({ message: 'Logro no encontrado' });
      }
      return res.status(200).json(logro);
    } catch (error) {
      console.error('Error al obtener logro por ID:', error);
      res.status(500).json({ message: 'Error al obtener el logro', error: error.message });
    }
  }

  async actualizarLogro(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const logro = await this.logroService.actualizarLogro(id, datosActualizados);
      if (!logro) {
        return res.status(404).json({ message: 'Logro no encontrado' });
      }
      res.status(200).json(logro);
    } catch (error) {
      console.error('Error al actualizar logro:', error);
      res.status(500).json({ message: 'Error al actualizar el logro', error: error.message });
    }
  }

  async eliminarLogro(req, res) {
    try {
      const id = req.params.id;
      const resultado = await this.logroService.eliminarLogro(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Logro no encontrado ' });
      }
      res.status(200).json({ message: 'Logro eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar logro:', error);
      res.status(500).json({ message: 'Error al eliminar el logro', error: error.message });
    }
  }
}

module.exports = LogroController;

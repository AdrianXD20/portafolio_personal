class ProyectoController {
  constructor(proyectoService) {
    this.proyectoService = proyectoService;
  }

  async crearProyecto(req, res) {
    try {
      const nuevoProyecto = req.body;
      const proyecto = await this.proyectoService.crearProyecto(nuevoProyecto);
      return res.status(201).json(proyecto);
    } catch (error) {
      console.error('Error creando nuevo proyecto:', error);
      res.status(500).json({ message: 'Error al crear el proyecto', error: error.message });
    }
  }

  async obtenerProyectos(req, res) {
    try {
      const proyectos = await this.proyectoService.obtenerProyectos();
      res.status(200).json(proyectos);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      res.status(500).json({ message: 'Error al obtener los proyectos', error: error.message });
    }
  }

  async obtenerProyectoPorId(req, res) {
    try {
      const id = req.params.id;
      const proyecto = await this.proyectoService.obtenerProyectoPorId(id);
      if (!proyecto) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
      return res.status(200).json(proyecto);
    } catch (error) {
      console.error('Error al obtener proyecto por ID:', error);
      res.status(500).json({ message: 'Error al obtener el proyecto', error: error.message });
    }
  }

  async actualizarProyecto(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      const proyecto = await this.proyectoService.actualizarProyecto(id, datosActualizados);
      if (!proyecto) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
      res.status(200).json(proyecto);
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      res.status(500).json({ message: 'Error al actualizar el proyecto', error: error.message });
    }
  }

  async eliminarProyecto(req, res) {
    try {
      const id = req.params.id;
      const resultado = await this.proyectoService.eliminarProyecto(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
      res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      res.status(500).json({ message: 'Error al eliminar el proyecto', error: error.message });
    }
  }
}

module.exports = ProyectoController;

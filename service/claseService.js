const Clases = require("../models/clases");
const ClaseAlumno = require("../models/claseAlumno");
const Usuario = require("../models/usuario");
const crypto = require('crypto');

class ClaseService {

  generarCodigo() {
    return crypto.randomBytes(3).toString('hex');
  }

  async crearClase(nombre, usuario) {

    // 🔐 validar que sea ADMIN
    if (usuario.rol !== "ADMIN") {
      return { error: "Solo profesores pueden crear clases" };
    }

    let codigo;
    let existe;

    // 🔥 asegurar código único
    do {
      codigo = this.generarCodigo();
      existe = await Clases.findOne({ where: { codigo } });
    } while (existe);

    const clase = await Clases.create({
      nombre,
      codigo,
      profesor_id: usuario.id
    });

    return clase;
  }

  async obtenerClases() {
    return await Clases.findAll({
      include: [
        {
          model: Usuario,
          as: 'profesor',
          attributes: ['nombre', 'email']
        }
      ]
    });
  }

  async obtenerAlumnosDeClase(clase_id, profesor_id) {
    // Verificar que el profesor es el de la clase
    const clase = await Clases.findOne({ where: { id: clase_id, profesor_id } });
    if (!clase) {
      return { error: "No eres el profesor de esta clase" };
    }

    return await ClaseAlumno.findAll({
      where: { clase_id },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        }
      ]
    });
  }

  async unirseClase(codigo, usuario_id) {
    const clase = await Clases.findOne({ where: { codigo } });

    if (!clase) {
      return { error: "Código inválido" };
    }

    const existe = await ClaseAlumno.findOne({
      where: {
        usuario_id,
        clase_id: clase.id
      }
    });

    if (existe) {
      return { error: "Ya estás en la clase" };
    }

    await ClaseAlumno.create({
      usuario_id,
      clase_id: clase.id
    });

    return { message: "Te uniste a la clase" };
  }

  async obtenerClasesProfesor(profesor_id) {
    return await Clases.findAll({ where: { profesor_id } });
  }

  async obtenerClasesAlumno(usuario_id) {
    return await ClaseAlumno.findAll({
      where: { usuario_id },
      include: [
        {
          model: Clases,
          as: 'clase',
          attributes: ['id', 'nombre', 'codigo']
        }
      ]
    });
  }
}

module.exports = ClaseService;
const express = require('express');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/cloudinary').upload;
const UserService = require('../service/usuarioService.js');
const { verifyToken } = require('../middleware/authMiddleware');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async crearUsuario(req, res) {
    console.log('como se viene: ', req.body);
    try {
      const imagenURL = req.file ? req.file.path : null;
      const nuevoUsuario = { ...req.body, foto_perfil: imagenURL };
      console.log('Los datos están llegando de esta forma:', nuevoUsuario);

      const User = await this.userService.crearUsuario(nuevoUsuario);
      return res.status(201).json(User);
    } catch (error) {
      console.error('Error creando nuevo Usuario :', error);
      res.status(500).json({ message: 'Error al crear el usuario :(', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, contraseña } = req.body;
      if (!email || !contraseña) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      const { JWT, user } = await this.userService.login(email, contraseña);
      res.status(200).json({ JWT, user });
    } catch (error) {
      console.error('Error al logear el usuario :', error);
      res.status(401).json({ message: 'Credenciales inválidas', error: error.message });
    }
  }

  async obtenerUsuarioAutenticado(req, res) {
    try {
      const user = await this.userService.obtenerUsuarioAutenticado(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerUsuarios(req, res) {
    try {
      const { page = 1, limit } = req.query;
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);
      const users = await this.userService.obtenerUsuarios(pageNumber, limitNumber);
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al buscar usuarios: ', error);
      res.status(500).json({ message: 'Tuvimos un error para obtener los usuarios.', error: error.message });
    }
  }

  async obtenerUsuarioId(req, res) {
    try {
      const id = req.params.id;
      const user = await this.userService.obtenerUsuarioId(id);
      if (!user) {
        return res.status(404).json({ message: 'Este Id no existe o no se encuentra disponible' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener usuario por Id:', error);
      res.status(500).json({ message: 'Tuvimos un error para obtener usuario por Id.', error: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const id = req.params.id;
      const datosActualizados = req.body;
      if (req.file) {
        datosActualizados.imagen_perfil = req.file.path;
      }
      const user = await this.userService.actualizarUsuario(id, datosActualizados);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado, revisa si existe ID' });
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ message: 'Problema al actualizar datos de usuario:', error: error.message });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const id = req.params.id;
      const user = await this.userService.eliminarUsuarios(id);
      if (user) {
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Hubo un error al eliminar usuario, checa si existe' });
      }
    } catch (error) {
      console.error('Hay un error para eliminar usuarios:', error);
      res.status(500).json({ message: 'Hubo un error para eliminar al usuario.', error: error.message });
    }
  }

  // Métodos para recuperación de contraseña (opcional)
  async recuperarPassword(req, res) {
    try {
      const { email } = req.body;
      const response = await this.userService.solicitarRecuperacion(email);
      res.json(response);
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      res.status(500).json({ message: 'Error en recuperación de contraseña.', error: error.message });
    }
  }

  async resetearPassword(req, res) {
    try {
      const { token, nuevaContraseña } = req.body;
      const response = await this.userService.resetearPassword(token, nuevaContraseña);

    if (response?.error) {
      return res.status(400).json(response); 
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear contraseña', error: error.message });
  }
};
}

module.exports = UserController;

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario');
require('dotenv').config();

// SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const secretKey = process.env.secretKey;

class UserService {
  constructor() {}

  async crearUsuario(nuevoUsuario) {
    console.log('Datos de como llegan al servicio: ', nuevoUsuario)
    try {
      
      const hashedPassword = await bcrypt.hash(nuevoUsuario.password, 10);
      nuevoUsuario.password = hashedPassword;

      
      const usuarioCreado = await User.create(nuevoUsuario);
      return usuarioCreado;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  async login(email, contraseña) {
    try {
      
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      
      const isPasswordValid = await bcrypt.compare(contraseña, user.password);
      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }

    
      const JWT = jwt.sign(
        { id: user.id, email: user.email, nombre: user.nombre,rol:user.rol},
        secretKey,
        { expiresIn: '1h' }
      );

      return { JWT, user };
    } catch (error) {
      throw new Error('Error en el proceso de login: ' + error.message);
    }
  }

  async resetearPassword(token, nuevaContraseña) {
    const user = await User.findOne({ where: { reset_token: token } });

    if (!user || user.token_expira < new Date()) return { error: 'Token inválido o expirado' }; // Token inválido o expirado

    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    await user.update({ password: hashedPassword, reset_token: null, token_expira: null });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async solicitarRecuperacion(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) return { message: 'Si el email existe, se enviará un correo' }; // No revelar si el usuario existe o no
  
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpira = new Date(Date.now() + 3600000);
  
    await user.update({ reset_token: token, token_expira: tokenExpira });
  
    const message = {
      to: user.email,
      from: process.env.SENDGRID_FROM_EMAIL || process.env.email,
      subject: 'Recuperación de contraseña',
      text: `Usa el siguiente enlace para restablecer tu contraseña: http://tudominio.com/reset-password?token=${token}`,
      html: `<p>Usa el siguiente enlace para restablecer tu contraseña:</p><p><a href="http://tudominio.com/reset-password?token=${token}">Restablecer contraseña</a></p>`
    };

    try {
      if (process.env.SENDGRID_API_KEY) {
        const response = await sgMail.send(message);
        console.log('SendGrid respuesta:', response[0]?.statusCode || 'OK');
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.email,
            pass: process.env.email_password
          }
        });
        const info = await transporter.sendMail({
          from: process.env.email,
          to: user.email,
          subject: 'Recuperación de contraseña',
          text: message.text
        });
        console.log('Nodemailer respuesta:', info.response);
      }

      return { message: 'Correo enviado correctamente' };
    } catch (error) {
      console.error('Error al enviar correo: ', error);
      return { error: 'No se pudo enviar el correo' };
    }
  }

  async obtenerUsuarios(page, limit){
    const offset = (page - 1) * limit;
    return User.findAll({limit, offset})
  }

  async obtenerUsuarioId(Id,){
    return User.findByPk(Id);
  }

  async actualizarUsuario(Id, datosActualizados, imagen= null){
    const users = await User.findByPk(Id);
    if(users){
      if(imagen){
        datosActualizados.foto_perfil = imagen;
      }
      const update = await User.update(datosActualizados,{
        where: {id:Id}
      });
      if (update > 0) {
        return User.findByPk(Id)
        
      };
      
    }
    return null
  }

  async eliminarUsuarios(Id){
    const users = await User.findByPk(Id)
    if(users){
      return User.destroy({
        where:{id:Id}
      })
    }
    return null
  }
  

}

module.exports = UserService;


const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const Users = require('../models/usuario');

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class AuthService {
  async solicitarRecuperacion(email) {
    const user = await Users.findOne({ where: { email } });
    if (!user) return null; // No revelar si el usuario existe o no

    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpira = new Date(Date.now() + 3600000); // 1 hora de validez

    // Guardar token en la base de datos
    await user.update({ reset_token: token, token_expira: tokenExpira });

    // Configurar y enviar correo con SendGrid
    const msg = {
      to: user.email,
      from: process.env.SENDGRID_FROM_EMAIL, // Tu email verificado en SendGrid
      subject: 'Recuperación de contraseña',
      text: `Usa el siguiente enlace para restablecer tu contraseña:
      http://tudominio.com/reset-password?token=${token}`,
      html: `<p>Usa el siguiente enlace para restablecer tu contraseña:</p>
      <a href="http://tudominio.com/reset-password?token=${token}">Restablecer contraseña</a>`
    };

    await sgMail.send(msg);
    return { message: 'Correo enviado' };
  }
}

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js';

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
    'CLAVE_SUPER_SECRETA_CAMBIAR_LUEGO',
    { expiresIn: '7d' }
  );
};

const registrar = async (datos) => {
  try {
    const { nombre, apellido, email, password, dni } = datos;

    if (!nombre || !apellido || !email || !password || !dni) {
      return { success: false, message: 'Faltan datos obligatorios.' };
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return { success: false, message: 'El correo ya está registrado.' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const usuarioCreado = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashed,
      dni,          
      estado: 'activo',
      admin: false
    });

    const token = generarToken(usuarioCreado);

    return {
      success: true,
      message: 'Usuario registrado correctamente.',
      token,
      usuario: usuarioCreado
    };

  } catch (error) {
    console.error('ERROR REGISTRO:', error);
    return { success: false, message: 'Error interno al registrar.' };
  }
};
 
const login = async ({ email, password }) => {
  try {
    if (!email || !password) {
      return { success: false, message: 'Credenciales incompletas.' };
    }

    const usr = await Usuario.findOne({ where: { email } });

    if (!usr) {
      return { success: false, message: 'Email o contraseña incorrectos.' };
    }

    const valido = await bcrypt.compare(password, usr.password);

    if (!valido) {
      return { success: false, message: 'Email o contraseña incorrectos.' };
    }

    const token = generarToken(usr);

    return {
      success: true,
      message: 'Inicio de sesión exitoso.',
      token,
      usuario: usr
    };

  } catch (error) {
    console.error('ERROR LOGIN:', error);
    return { success: false, message: 'Error en el servidor.' };
  }
};

const cambiarPassword = async (id, passwordActual, passwordNueva) => {
  try {
    const usr = await Usuario.findOne({ where: { id } });
    if (!usr) return { success: false, message: 'Usuario no encontrado.' };

    const coincide = await bcrypt.compare(passwordActual, usr.password);
    if (!coincide) {
      return { success: false, message: 'Contraseña actual incorrecta.' };
    }

    const hashed = await bcrypt.hash(passwordNueva, 10);

    await Usuario.update(
      { password: hashed },
      { where: { id } }
    );

    return { success: true, message: 'Contraseña actualizada.' };
  } catch (error) {
    console.error('ERROR CAMBIAR PASSWORD:', error);
    return { success: false, message: 'Error al cambiar la contraseña.' };
  }
};

export const cambiarEstadoUsuario = async (id, nuevoEstado) => {  
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error("Usuario no encontrado");

  usuario.estado = nuevoEstado;
  await usuario.save();

  return usuario;
};


const solicitarRecuperacion = async (email) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    

    if (!usuario) {
      console.log(`[Seguridad] Intento de recuperación para email no existente: ${email}`);
      return { success: true, message: 'Si el correo existe, se enviaron instrucciones.' };
    }

    console.log(`📧 SIMULACIÓN: Se envió un correo de recuperación a ${email}`);
    
    return { success: true, message: 'Correo de recuperación enviado.' };
  } catch (error) {
    console.error('ERROR SOLICITAR RECUPERACION:', error);
    return { success: false, message: 'Error interno.' };
  }
};

const restablecerPassword = async (email, nuevaPassword) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return { success: false, message: 'No se pudo restablecer la contraseña (Usuario no encontrado).' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(nuevaPassword, salt);

    usuario.password = hashed;
    await usuario.save();

    return { success: true, message: 'Tu contraseña ha sido restablecida exitosamente.' };
  } catch (error) {
    console.error('ERROR RESTABLECER PASSWORD:', error);
    return { success: false, message: 'Error al restablecer la contraseña.' };
  }
};

export default {
  registrar,
  login,
  cambiarPassword,
  cambiarEstadoUsuario,
  solicitarRecuperacion,
  restablecerPassword
};

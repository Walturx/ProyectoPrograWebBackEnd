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
    console.log('=== REGISTRO REQUEST ===');
    console.log(datos); // Para ver exactamente qué llega desde el body

    
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
    console.log('\n=== LOGIN REQUEST ===');
    console.log('Email recibido:', email);
    console.log('Password recibido:', password);

    if (!email || !password) {
      console.log('Faltan credenciales');
      return { success: false, message: 'Credenciales incompletas.' };
    }

    const usr = await Usuario.findOne({ where: { email } });
    console.log('Usuario encontrado:', usr ? usr.toJSON() : null);

    if (!usr) {
      console.log('No existe usuario con ese email');
      return { success: false, message: 'Email o contraseña incorrectos.' };
    }

    console.log('Hash guardado en BD:', usr.password);

    const valido = await bcrypt.compare(password, usr.password);
    console.log('¿Password válido?:', valido);

    if (!valido) {
      console.log('Password incorrecto');
      return { success: false, message: 'Email o contraseña incorrectos.' };
    }

    const token = generarToken(usr);

    console.log('=== LOGIN OK ===\n');

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

export default {
  registrar,
  login,
  cambiarPassword,
  cambiarEstadoUsuario
};

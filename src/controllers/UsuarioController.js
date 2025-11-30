import repository from '../repositories/UsuarioRepository.js';
import usuarioService from '../services/UsuarioService.js';
import bcrypt from 'bcryptjs';
import axios from 'axios';

// ================= LISTAR ==================
const findAll = async (req, res) => {
  const respuesta = await repository.findAll();
  return sendResults(respuesta, res, 'No se han encontrado usuarios.');
};

// ================= BUSCAR UNO ================
const findOne = async (req, res) => {
  const id = req.params.id;
  const result = await repository.findOne(id);
  return sendResults(result, res, 'Usuario no encontrado.');
};

// ================= CREAR (+HASHEADO) ===========
const create = async (req, res) => {
  const object = req.body;

  if (object.password) {
    const salt = await bcrypt.genSalt(10);
    object.password = await bcrypt.hash(object.password, salt);
  }

  const createdObj = await repository.create(object);

  if (!createdObj) {
    return sendResults(createdObj, res, 'Error al crear el usuario.');
  }

  try {
    await axios.post('https://bytatileon.app.n8n.cloud/webhook/nuevo_usuario', {
      idusuario: createdObj.id,
      nombre: createdObj.nombre,
      apellido: createdObj.apellido,
      email: createdObj.email,
      telefono: createdObj.telefono,
      direccion: createdObj.direccion,
      estado: createdObj.estado,
      fechaRegistro: createdObj.fecharegistro
    });
  } catch (error) {
    console.error("⚠ Error enviando webhook:", error.message);
  }

  return sendResults(createdObj, res, 'Error al crear el usuario.');
};

// ============ ACTUALIZAR ==================
const update = async (req, res) => {
  const object = req.body;
  const updatedObj = await repository.update(object);
  return sendResults(updatedObj, res, 'Error al actualizar usuario.');
};

// ============ ELIMINAR ==================
const remove = async (req, res) => {
  const id = req.params.id;
  const result = await repository.remove(id);
  return sendResults(result, res, 'Error al eliminar el usuario.');
};

// ================= LOGIN =================
const login = async (req, res) => {
  const result = await usuarioService.login(req.body);
  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(401).json(result);
  }
};

// ============ CAMBIAR CONTRASEÑA (Logueado) ==============
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { passwordActual, passwordNueva } = req.body;

  const result = await usuarioService.cambiarPassword(id, passwordActual, passwordNueva);

  if (!result.success) return res.status(400).json(result);

  return res.status(200).json(result);
};

// ============ RECUPERAR CONTRASEÑA (Olvido) ==============
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'El email es obligatorio' });

  const result = await usuarioService.solicitarRecuperacion(email);
  return res.status(200).json(result);
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ message: 'Faltan datos' });

  const result = await usuarioService.restablecerPassword(email, newPassword);
  
  if (result.success) return res.status(200).json(result);
  return res.status(400).json(result);
};

// ============ Actualizar estado ======================
 const cambiarEstado = async (req, res) =>{
  const { id } = req.params;
    const { estado } = req.body;

    try {
    const usuarioActualizado = await usuarioService.cambiarEstadoUsuario(id, estado);
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
 }

// ============ RESPUESTA ======================
const sendResults = (result, res, message) => {
  if (result)
    return res.status(200).json(result);
  else
    return res.status(500).json({ message });
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
  changePassword,
  login,
  cambiarEstado,
  requestPasswordReset,
  resetPassword
};

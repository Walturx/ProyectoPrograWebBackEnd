import repository from '../repositories/UsuarioRepository.js';
import axios from 'axios';

const findAll = async (req, res) => {
  const respuesta = await repository.findAll();
  return sendResults(respuesta, res, 'No se han encontrado usuarios.');
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const result = await repository.findOne(id);
  return sendResults(result, res, 'Usuario no encontrado.');
};

const create = async (req, res) => {
  const object = req.body;
  const createdObj = await repository.create(object);

  // Validar que se creó correctamente antes de enviar webhook
  if (!createdObj) {
    return sendResults(createdObj, res, 'Error al crear el usuario.');
  }

  // ---- ENVÍO DE WEBHOOK A N8N ----
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

    console.log("📩 Webhook enviado correctamente a n8n");
  } catch (error) {
    console.error("⚠️ Error enviando webhook:", error.message);
  }

  return sendResults(createdObj, res, 'Error al crear el usuario.');
};

const update = async (req, res) => {
  const object = req.body;
  const updatedObj = await repository.update(object);
  return sendResults(updatedObj, res, 'Error al actualizar usuario.');
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await repository.remove(id);
  return sendResults(result, res, 'Error al eliminar el usuario.');
};

// ---------------- CAMBIO DE CONTRASEÑA ----------------
const changePassword = async (req, res) => {
  const id = req.params.id;
  const { passwordActual, passwordNueva } = req.body;

  if (!passwordActual || !passwordNueva) {
    return res.status(400).json({
      message: 'Debe enviar passwordActual y passwordNueva.'
    });
  }

  const user = await repository.findOne(id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado.' });
  }

  // Comparación simple (si luego usas bcrypt aquí cambias esto)
  if (user.password !== passwordActual) {
    return res.status(400).json({
      message: 'Contraseña actual incorrecta.'
    });
  }

  const payload = {
    ...user.dataValues,
    password: passwordNueva
  };

  const updated = await repository.update(payload);

  if (!updated) {
    return res.status(500).json({
      message: 'Error al actualizar contraseña.'
    });
  }

  return res.status(200).json({
    message: 'Contraseña actualizada correctamente.'
  });
};

// ---------------- FUNCIÓN DE RESPUESTA ----------------
const sendResults = (result, res, message) => {
  if (result)
    return res.status(200).json(result);
  else
    return res.status(500).json({ message });
};

export default { findAll, findOne, create, update, remove, changePassword };

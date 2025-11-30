import repository from '../repositories/OrdenRepository.js';
import axios from "axios";

const findAll = async (req, res) => {
  try {
    const respuesta = await repository.findAll();
    return sendResults(respuesta, res, 'No se encontraron órdenes.');
  } catch (error) {
    return sendError(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await repository.findDetail(id);

    return sendResults(result, res, 'Orden no encontrada.');
  } catch (error) {
    return sendError(error, res);
  }
};

const create = async (req, res) => {
  try {
    const object = req.body;
    const createdObj = await repository.create(object);

    // Validar que se creó correctamente
    if (!createdObj) {
      return sendResults(createdObj, res, 'Error al crear orden.');
    }

    // =========== 📩 Enviar a Webhook N8N ==========
    try {
      console.log('📤 Preparando envío de webhook a n8n para orden:', createdObj.id);

      await axios.post("https://bytatileon.app.n8n.cloud/webhook/nueva_orden", {
        idorden: createdObj.id,
        idusuario: createdObj.idusuario,
        subtotal: createdObj.subtotal,
        total: createdObj.total,
        metododeentrega: createdObj.metododeentrega,
        direccionenvio: createdObj.direccionenvio,
        estado: createdObj.estado
      });

      console.log("✅ Webhook de orden enviado correctamente a n8n");
    } catch (err) {
      console.error("⚠️ No se pudo enviar al webhook N8N:", err.message);
    }

    return sendResults(createdObj, res, 'Error al crear orden.');
  } catch (error) {
    return sendError(error, res);
  }
};

const update = async (req, res) => {
  try {
    const updatedObj = await repository.update(req.body);
    return sendResults(updatedObj, res, 'Error al actualizar orden.');
  } catch (error) {
    return sendError(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await repository.remove(req.params.id);
    return sendResults(deleted, res, 'Error al eliminar orden.');
  } catch (error) {
    return sendError(error, res);
  }
};

const sendResults = (result, res, message) => {
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message });
};

const sendError = (error, res) => {
  console.error("❌ Error en OrdenController:", error);
  return res.status(500).json({ message: "Error interno en servidor.", error: error.message });
};

export default { findAll, findOne, create, update, remove };
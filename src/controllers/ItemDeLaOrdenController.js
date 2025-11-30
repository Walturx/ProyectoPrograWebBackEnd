import repository from "../repositories/ItemDeLaOrdenRepository.js";

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();
    return sendResults(respuesta, res, "No se encontraron items de orden.");
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResults(result, res, "Item de orden no encontrado.");
}

const findByOrden = async (req, res) => {
  try {
    const items = await itemOrdenRepository.findByOrden(req.params.idorden);
    return res.json({ success: true, data: items });
  } catch (error) {
    console.error("ERROR findByOrden:", error);
    return res.status(500).json({ success: false, message: "Error interno." });
  }
};

const create = async (req, res) => {
    const object = req.body;
    const createdObj = await repository.create(object);
    return sendResults(createdObj, res, "Error al crear item de orden.");
}

const update = async (req, res) => {
    const object = req.body;
    const updatedObj = await repository.update(object);
    return sendResults(updatedObj, res, "Error al actualizar item de orden.");
}

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);
    return sendResults(result, res, "Error al eliminar item de orden.");
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message });
}

export default { findAll, findOne, findByOrden, create, update, remove };

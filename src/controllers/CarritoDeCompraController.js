import repository from "../repositories/CarritoDeCompraRepository.js";

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();
    return sendResults(respuesta, res, "No se encontraron carritos.");
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResults(result, res, "Carrito no encontrado.");
}

const findByUsuario = async (req, res) => {
  try {
    const carrito = await repository.findByUsuario(req.params.idusuario);
    return res.json({ success: true, data: carrito });
  } catch (error) {
    console.error("ERROR findByUsuario:", error);
    return res.status(500).json({ success: false, message: "Error interno." });
  }
};

const create = async (req, res) => {
    const object = req.body;
    const createdObj = await repository.create(object);
    return sendResults(createdObj, res, "Error al crear carrito.");
}

const update = async (req, res) => {
    const object = req.body;
    const updatedObj = await repository.update(object);
    return sendResults(updatedObj, res, "Error al actualizar carrito.");
}

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);
    return sendResults(result, res, "Error al eliminar carrito.");
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message });
}

export default { findAll, findOne,findByUsuario, create, update, remove };

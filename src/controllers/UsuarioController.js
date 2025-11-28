import repository from "../repositories/UsuarioRepository.js";

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();
    return sendResults(respuesta, res, "No se han encontrado usuarios.");
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);
    return sendResults(result, res, "Usuario no encontrado.");
}

const create = async (req, res) => {
    const object = req.body;
    const createdObj = await repository.create(object);
    return sendResults(createdObj, res, "Error al crear el usuario.");
}

const update = async (req, res) => {
    const object = req.body;
    const updatedObj = await repository.update(object);
    return sendResults(updatedObj, res, "Error al actualizar usuario.");
}


const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);
    return sendResults(result, res, "Error al eliminar el usuario.");
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message });
}

export default { findAll, findOne, create, update, remove };

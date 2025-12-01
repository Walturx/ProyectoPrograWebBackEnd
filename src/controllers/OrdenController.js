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

const findByUsuario = async (req, res) => {
    try {
        const { idusuario } = req.params;
        const ordenes = await repository.findByUsuario(idusuario);

        if (!ordenes) {
            return res.status(404).json({ message: "No se encontraron órdenes." });
        }

        return res.status(200).json(ordenes);
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
        console.log("📦 PAYLOAD RECIBIDO EN BACKEND:", req.body);

        const {
            idusuario,
            subtotal,
            total,
            metododeentrega,
            direccionenvio,
            metodopago,
            nrotarjeta,
            tipotarjeta
        } = req.body;

        // VALIDAR CAMPOS
        if (!idusuario || !total || !metododeentrega || !metodopago) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios para crear la orden."
            });
        }

        // Construcción del objeto final que sí se guardará
        const data = {
            idusuario,
            fecha: new Date(),
            subtotal: subtotal ?? total,
            total,
            metododeentrega,
            direccionenvio,
            metodopago,
            nrotarjeta: metodopago === "TARJETA" ? nrotarjeta : null,
            tipotarjeta: metodopago === "TARJETA" ? tipotarjeta : null,
            estado: "Pendiente"
        };

        // Registrar la orden
        const createdObj = await repository.create(data);

        if (!createdObj) {
            return res.status(500).json({
                success: false,
                message: "Error al crear orden en la base de datos."
            });
        }

        // Optional: Webhook
        try {
            await axios.post("https://bytatileon.app.n8n.cloud/webhook/nueva_orden", {
                idorden: createdObj.id,
                idusuario: createdObj.idusuario,
                subtotal: createdObj.subtotal,
                total: createdObj.total,
                metododeentrega: createdObj.metododeentrega,
                direccionenvio: createdObj.direccionenvio,
                estado: createdObj.estado
            });
        } catch (err) {
            console.error("⚠️ No se pudo enviar al webhook N8N:", err.message);
        }

        return res.status(200).json({ success: true, data: createdObj });

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

export default {
    findAll,
    findOne,
    findByUsuario,
    create,
    update,
    remove
};


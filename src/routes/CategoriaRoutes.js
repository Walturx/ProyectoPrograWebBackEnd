import express from 'express';
import controller from '../controllers/CategoriaController.js';

const router = express.Router();

// Listado de Categorías (Admin) 
router.get('/', controller.findAll);

// Detalle de una categoría
router.get('/:id', controller.findOne);

// Agregar categoría (Admin)
router.post('/', controller.create);

// Editar categoría (Admin)
router.put('/', controller.update);

// Eliminar categoría (Admin)
router.delete('/:id', controller.remove);

export default router;

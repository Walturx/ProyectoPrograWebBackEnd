import express from 'express';
import controller from '../controllers/ItemDeCarritoController.js';

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
// Obtener items por carrito
router.get('/carrito/:idcarrito', controller.findByCarrito);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

export default router;

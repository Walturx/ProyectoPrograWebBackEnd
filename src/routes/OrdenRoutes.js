import express from 'express';
import controller from '../controllers/OrdenController.js';

import authMiddleware from '../middlewares/AuthMiddleware.js';

console.log(' OrdenRoutes cargado');     

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);

// GET http://localhost:3005/orden/usuario/1
router.get('/usuario/:idusuario', authMiddleware, controller.findByUsuario);

router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

export default router;


/*
import express from 'express';
import controller from '../controllers/UsuarioController.js';

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

// Cambiar contraseña (usuario registrado)
router.put('/:id/password', controller.changePassword);

export default router;
*/

import express from 'express';
import controller from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Rutas Públicas (Cualquiera puede entrar)
router.post('/login', controller.login);      
router.post('/registrar', controller.create); 

// Rutas de Recuperación de Contraseña (Públicas)
router.post('/recuperar-password', controller.requestPasswordReset);
router.post('/reset-password', controller.resetPassword);

// Rutas Protegidas (Requieren Token)
router.put('/:id/estado', controller.cambiarEstado);
router.get('/', authMiddleware, controller.findAll);
router.get('/:id', authMiddleware, controller.findOne);
router.put('/', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.remove);
router.put('/:id/password', authMiddleware, controller.changePassword);

export default router;
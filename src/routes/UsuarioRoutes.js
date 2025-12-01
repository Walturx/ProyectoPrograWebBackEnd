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

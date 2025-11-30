
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

const router = express.Router();

// CRUD básico
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id', controller.remove);

// Registro (usuario nuevo)
router.post('/registrar', controller.create);

// Login (devuelve token)
//router.post('/login', controller.login);

// Cambiar contraseña
router.put('/:id/password', controller.changePassword);

export default router;

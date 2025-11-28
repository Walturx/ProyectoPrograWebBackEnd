import express from 'express';
import carritoRouter from './src/routes/CarritoDeCompraRoutes.js'
import usuarioRouter from './src/routes/UsuarioRoutes.js'

import cors from 'cors';

const app = express();

// Middleware correcto
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, resp) => {
    return resp.json({ mensaje: "Hola mundo", code: 200});
})

app.use('/carrito', carritoRouter);
app.use('/usuario', usuarioRouter);

app.listen(3005, () => {
    console.log('Server is running on port 3005.')
})

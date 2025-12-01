/*
samantha:
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

*/

/*
import express from 'express';
import cors from 'cors';

import carritoRouter from './src/routes/CarritoDeCompraRoutes.js';
import usuarioRouter from './src/routes/UsuarioRoutes.js';
import categoriaRoutes from './src/routes/CategoriaRoutes.js';
import ordenRoutes from './src/routes/OrdenRoutes.js';        
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, resp) => {
  return resp.json({ mensaje: "Hola mundo", code: 200 });
});

app.use('/carrito', carritoRouter);
app.use('/usuario', usuarioRouter);
app.use('/categoria', categoriaRoutes);
app.use('/orden', ordenRoutes);                             

app.listen(3005, () => {
  console.log('Server is running on port 3005.')
});
*/

// index.js
import express from 'express';
import cors from 'cors';

import carritoRoutes from './src/routes/CarritoDeCompraRoutes.js';
import usuarioRouter from './src/routes/UsuarioRoutes.js';
import categoriaRoutes from './src/routes/CategoriaRoutes.js';
import ordenRoutes from './src/routes/OrdenRoutes.js';
import productoRoutes from './src/routes/ProductoRoutes.js';
import itemCarritoRoutes from './src/routes/ItemDeCarritoRoutes.js';
import itemOrdenRoutes from './src/routes/ItemDeLaOrdenRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOG para saber que el server arrancó
console.log('Backend iniciado');

app.get('/', (req, resp) => {
  return resp.json({ mensaje: "Hola mundo", code: 200 });
});

// rutas
app.use('/carrito', carritoRoutes);
app.use('/usuario', usuarioRouter);
app.use('/categoria', categoriaRoutes);
app.use('/orden', ordenRoutes);
app.use('/admin/productos', productoRoutes); // Ruta alternativa para admin (debe ir ANTES de /producto)
app.use('/producto', productoRoutes);
app.use('/itemcarrito', itemCarritoRoutes);
app.use('/itemorden', itemOrdenRoutes);
// catch-all para debug de 404
app.use((req, res) => {
  console.log('❌ Ruta no encontrada:', req.method, req.url);
  res.status(404).send(`No existe ${req.method} ${req.url}`);
});

app.listen(3005, () => {
  console.log('Server is running on port 3005.')
});

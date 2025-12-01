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

console.log('Backend iniciado');

app.get('/', (req, res) => {
  return res.json({
    mensaje: "Hola mundo",
    code: 200,
    vercel: process.env.VERCEL ? "Sí, en Vercel" : "No, en local",
    port: process.env.PORT || 3005
  });
});

// Rutas
app.use('/carrito', carritoRoutes);
app.use('/usuario', usuarioRouter);
app.use('/categoria', categoriaRoutes);
app.use('/orden', ordenRoutes);
app.use('/admin/productos', productoRoutes);
app.use('/producto', productoRoutes);
app.use('/itemcarrito', itemCarritoRoutes);
app.use('/itemorden', itemOrdenRoutes);

// Catch-all para 404
app.use((req, res) => {
  console.log('❌ Ruta no encontrada:', req.method, req.url);
  res.status(404).send(`No existe ${req.method} ${req.url}`);
});

// Usar puerto dinámico para Vercel
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

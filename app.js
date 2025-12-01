import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import categoriaRoutes from './src/routes/CategoriaRoutes.js';


app.use('/categoria', categoriaRoutes);


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;

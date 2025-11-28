import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, resp) => {
  return resp.json({ mensaje: "Hola mundo", code: 200 });
})



export default app
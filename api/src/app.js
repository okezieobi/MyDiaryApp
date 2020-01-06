import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './configs/swagger';
import allRoutes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, '../../ui/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../ui/build', 'index.html'));
});

allRoutes(app);

export default app;

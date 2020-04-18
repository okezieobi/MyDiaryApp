import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import path from 'path';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './configs/swagger';
import CustomErrs from './errors/custom';
import allRoutes from './routes/router';

const { handleErrors } = CustomErrs;

const app = express();

app.use(cors(), express.urlencoded({ extended: true }), express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, '../../ui/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../ui/build', 'index.html'));
});

app.response.sendExtended = function sendExtendedName(statusCode, type, response) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type)
    .status(statusCode)
    .send(response);
};

allRoutes(app);

app.use(handleErrors);

export default app;

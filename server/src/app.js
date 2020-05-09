import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './configs/swagger';
import CustomErrs from './errors/custom';
import allRoutes from './routes/router';

const { handleErrors, handleServerErrors } = CustomErrs;

const app = express();

app.use(cors(),
  express.urlencoded({ extended: true }),
  express.json(),
  cookieParser());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.response.sendExtended = function sendExtendedName(statusCode, type, response) {
  // code is intentionally kept simple for demonstration purpose
  // copied from express docs
  return this.contentType(type)
    .status(statusCode)
    .send(response);
};

app.use(logger('dev'));
allRoutes(app);
app.use(handleErrors, handleServerErrors);

export default app;

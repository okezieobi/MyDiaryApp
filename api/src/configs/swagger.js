import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'REST API for a diary app', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for a simple diary web app', // short description of the app
  },
  servers: [
    { url: 'https://diary-app-react-node.herokuapp.com/api/v1', description: 'Deployed server' },
    { url: 'http://localhost:5000/api/v1', description: 'Local development/testing server' },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'token',
      },
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);

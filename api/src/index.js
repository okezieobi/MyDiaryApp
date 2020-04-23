import app from './app';
import env from './configs/env';

const { warn } = console;
const { appPort } = env;

app.listen(appPort || '5000', () => {
  warn(`App is live and listening on port ${appPort || '5000'}!`);
});

export default app;

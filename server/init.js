const app = require('./core/bootstrap/server.bootstrap');
const db = require('./core/bootstrap/database.bootstrap');
const routes = require('./routes/index.routes');
const env = require('./core/helpers/yenv.helper');
const winston = require('./core/helpers/winston.helper');

// El warning de mongo error se puede ignorar seguramente, ya que sera solventado
// https://developer.mongodb.com/community/forums/t/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-circular-dependency/15411/6
db.connect()
  .then(() => {
    winston.console.info('CONNECTED', { origin: 'Database' });
    try {
      routes.setRoutes(app);
      app.listen(env.SERVER.PORT, () => {
        winston.console.info(`Server listening on port: ${env.SERVER.PORT}`, { origin: 'Express' });
      });
    } catch (error) {
      winston.console.error(error.message, { origin: 'Express' });
    }
  })
  .catch((error) => {
    winston.console.error(error.message, { origin: 'Database error' });
  });

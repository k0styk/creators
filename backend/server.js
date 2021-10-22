const path = require('path');

if (process.env['NODE_ENV'] === 'dev') {
  require('dotenv').config();

  if (process.env['SUPER_LOGGER']) {
    ['debug', 'log', 'warn', 'error'].forEach((methodName) => {
      const path = require('path');
      const originalLoggingMethod = console[methodName];
      console[methodName] = (firstArgument, ...otherArguments) => {
        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const callee = new Error().stack[1];
        Error.prepareStackTrace = originalPrepareStackTrace;
        const relativeFileName = path.relative(
          process.cwd(),
          callee.getFileName()
        );
        const prefix = `${relativeFileName}:${callee.getLineNumber()}:`;
        if (typeof firstArgument === 'string') {
          originalLoggingMethod(
            prefix + ' ' + firstArgument,
            ...otherArguments
          );
        } else {
          originalLoggingMethod(prefix, firstArgument, ...otherArguments);
        }
      };
    });
  }
} else {
  result = require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.production'),
  });
}
const mongoose = require('mongoose');
const PORT_FORK = process.env['APP_PORT'] || '8000',
  PORT_PART = process.env['APP_PORT_PART'] || '800',
  HOST = process.env['APP_HOST'] || 'localhost',
  instance = process.env['NODE_APP_INSTANCE'];
const PORT =
  process.env['exec_mode'] === 'cluster_mode'
    ? PORT_PART + instance
    : PORT_FORK;

(async () => {
  async function listenCallback() {
    try {
      process.send && process.send('ready');
    } catch (err) {
      console.log('Some error occured');
      console.log(err);
    } finally {
      console.log(
        `Server started at: http://${HOST}:${PORT}; process: ${instance}`
      );
    }
  }
  await mongoose.connect(process.env['DB_URL'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = require('./app');
  const httpServer = require('http').createServer(app);
  require('./socket')(httpServer);
  httpServer.listen(PORT, HOST, listenCallback);
})();

/* PM2 BLOCK START */
process.on('SIGINT', async () => {
  console.log('Received SIGINT');
  // disconnect DB if instance running
  await mongoose.connection.close();
  process.exit(0);
});

process.on('message', async (msg) => {
  if (msg === 'shutdown') {
    // disconnect DB if instance running
    await mongoose.connection.close();
    process.exit(0);
  }
});
/* /* PM2 BLOCK END */

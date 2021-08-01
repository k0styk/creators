require('dotenv').config();

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
            // if we have socket connection to DB or another
        } catch (err) {
            console.log('Some error occured');
            console.log(err);
        } finally {
            console.log(
                `Server started at: http://${HOST}:${PORT}; process: ${instance}`
            );
        }
    }

    const app = require('./app');
    const httpServer = require('http').createServer(app);
    require('./socket')(httpServer);
    httpServer.listen(PORT, HOST, listenCallback);
})();

/* PM2 BLOCK START */
process.on('SIGINT', async () => {
    console.log('Received SIGINT');
    // disconnect DB if instance running
    process.exit(0);
});

process.on('message', async (msg) => {
    if (msg === 'shutdown') {
        // console.log('Closing all connections...');
        // disconnect DB if instance running
        process.exit(0);
    }
});
/* /* PM2 BLOCK END */

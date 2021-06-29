require('dotenv').config();

const PORT = process.env['APP_PORT'] || '8000',
    HOST = process.env['APP_HOST'] || 'localhost';

(async () => {
    async function listenCallback() {
        try {
            process.send && process.send('ready');
            // if we have socket connection to DB or another
        } catch (err) {
            console.log('Some error occured');
            console.log(err);
        } finally {
            console.log(`Server started at: http://${HOST}:${PORT}`);
        }
    }

    require('./app').listen(PORT, HOST, listenCallback);
})();

/* PM2 BLOCK START */
process.on('SIGINT', async () => {
    console.log('Received SIGINT');
    // disconnect DB if instance running
    process.exit(0);
});

process.on('message', async (msg) => {
    if (msg === 'shutdown') {
        console.log('Closing all connections...');
        // disconnect DB if instance running
        process.exit(0);
    }
});
/* /* PM2 BLOCK END */

module.exports = {
    apps: [
        {
            name: 'api_app',
            script: './server.js',
            watch: ['./'],
            ignore_watch: [
                './migrations',
                './.logs',
                './node_modules',
                './.env',
                './.gitignore',
                './packae.json',
                './packae-lock.json',
            ],
            watch_delay: 5000,
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
            error_file: '.logs/err.log',
            out_file: '.logs/out.log',
            max_restarts: 4,
            restart_delay: 5000,
            env: {
                NODE_ENV: 'dev',
            },
            env_production: {
                NODE_ENV: 'production',
            },
            shutdown_with_message: true,
        },
    ],
};

module.exports = {
    apps: [
        {
            name: 'api_app',
            script: './server.js',
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            merge_logs: true,
            error_file: '.logs/err.log',
            out_file: '.logs/out.log',
            max_restarts: 5,
            restart_delay: 5000,
            env: {
                NODE_ENV: 'dev',
            },
            env_production: {
                NODE_ENV: 'production',
            },
            listen_timeout: 10000,
            kill_timeout: 3000,
            wait_ready: true,
            shutdown_with_message: true,
            exec_mode: 'cluster',
            instances: 4,
        },
    ],
};

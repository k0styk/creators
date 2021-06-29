module.exports = {
    apps: [
        {
            name: 'api_app',
            script: './server.js',
            //watch: ['./server/'],
            //ignore_watch: ['service', 'helpers'],
            watch_delay: 5000,
            // ignore_watch : [
            //   ".git",
            //   ".logs",
            //   "dist",
            //   "temp",
            //   "config",
            //   "pm2",
            //   "./*.js",
            //   "./*.json",
            //   "./*.md",
            //   "./src/client",
            //   "./src/migrations"
            // ],
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
            error_file: '.logs/err.log',
            out_file: '.logs/out.log',
            max_restarts: 4,
            restart_delay: 5000,
            env: {
                NODE_ENV: 'dev',
                args: ['--ignore-watch=service'],
            },
            env_production: {
                NODE_ENV: 'production',
            },
            shutdown_with_message: true,
            // instances : "4",
            // exec_mode : "cluster"
        },
    ],
};

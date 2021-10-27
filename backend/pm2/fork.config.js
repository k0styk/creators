module.exports = {
  apps: [
    {
      name: 'test_api_app',
      script: './server.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      error_file: '.logs/err.log',
      out_file: '.logs/out.log',
      max_restarts: 4,
      restart_delay: 5000,
      env: {
        NODE_ENV: 'production',
      },
      shutdown_with_message: true,
    },
  ],
};

const webpack = require('./webpack.config')({mode: 'test'});

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {
        pattern: './karma.shim.js',
        watched: false
      }
    ],

    preprocessors: {
      './karma.shim.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};

import 'core-js/es6';
import 'core-js/es7/reflect';

declare const env: any;

require('zone.js/dist/zone');

if (env.mode !== 'prod') {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

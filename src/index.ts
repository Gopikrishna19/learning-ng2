import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app';
import './index.scss';

declare let env: any;

if (env.mode === 'prod') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

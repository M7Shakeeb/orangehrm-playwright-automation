import { World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';

/**
 * Custom World interface extending Cucumber's World
 * This makes page, context, and browser available in all step definitions
 */
export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

/**
 * Custom World class implementation
 */
export class CustomWorldImpl extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

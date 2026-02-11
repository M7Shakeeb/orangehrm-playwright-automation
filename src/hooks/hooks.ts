import { Before, After, Status, BeforeAll, AfterAll, setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { config } from '../utils/config';
import { CustomWorld, CustomWorldImpl } from '../types/world';


setWorldConstructor(CustomWorldImpl);


setDefaultTimeout(60000);


BeforeAll(async function() {
  console.log('Test Execution Started');
  console.log(`Browser: ${config.browser}`);
  console.log(`Base URL: ${config.baseURL}`);
  console.log(`Headed Mode: ${config.headed}`);
  console.log(`Timeout: ${config.timeout}ms`);
  console.log('\n');
});


Before(async function(this: CustomWorld) {
  let browser: Browser;

  try {
    // Launch browser based on configuration
    switch (config.browser) {
      case 'firefox':
        browser = await firefox.launch({ headless: !config.headed });
        break;
      case 'webkit':
        browser = await webkit.launch({ headless: !config.headed });
        break;
      case 'chromium':
      default:
        browser = await chromium.launch({ headless: !config.headed });
        break;
    }

    // Create new browser context (like incognito mode)
    const context: BrowserContext = await browser.newContext({
      baseURL: config.baseURL,
      viewport: config.viewport,
      ignoreHTTPSErrors: true,
      acceptDownloads: false,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    // Create new page
    const page: Page = await context.newPage();
    page.setDefaultTimeout(config.timeout);

    // Attach to world (makes available in step definitions)
    this.browser = browser;
    this.context = context;
    this.page = page;

  } catch (error) {
    console.error('Failed to initialize browser:', error);
    throw error;
  }
});


After(async function(this: CustomWorld, { pickle, result }) {
  try {
    // Take screenshot if test failed
    if (result?.status === Status.FAILED && this.page) {
      const timestamp = new Date().getTime();
      const scenarioName = pickle.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      const screenshotName = `FAILED_${scenarioName}_${timestamp}.png`;
      
      const screenshot = await this.page.screenshot({
        path: `screenshots/${screenshotName}`,
        fullPage: true
      });

      // Attach to Cucumber report
      this.attach(screenshot, 'image/png');
      console.log(`Screenshot saved: ${screenshotName}`);
    }

  } catch (error) {
    console.error('Failed to capture screenshot:', error);
  } finally {
    // cleanup (even if screenshot fails)
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError);
    }
  }
});


AfterAll(async function() {
  console.log('Test Execution Completed');
});

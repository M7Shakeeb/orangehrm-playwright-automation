import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL?.trim() || 'https://opensource-demo.orangehrmlive.com',
  browser: (process.env.BROWSER?.trim() || 'chromium') as 'chromium' | 'firefox' | 'webkit',
  headed: process.env.HEADED?.trim() === 'true',
  timeout: parseInt(process.env.TIMEOUT?.trim() || '30000', 10) || 30000,
  viewport: {
    width: parseInt(process.env.VIEWPORT_WIDTH?.trim() || '1920', 10) || 1920,
    height: parseInt(process.env.VIEWPORT_HEIGHT?.trim() || '1080', 10) || 1080
  }
};

// Validate configuration
if (isNaN(config.timeout)) {
  console.warn('Invalid TIMEOUT value, using default: 30000');
  config.timeout = 30000;
}

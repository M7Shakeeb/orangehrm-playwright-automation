const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, '../../reports/json');
if (!fs.existsSync(jsonDir)) {
  console.error('Cucumber JSON reports directory not found. Run tests first: npm test');
  process.exit(1);
}

// Generate enhanced HTML report
report.generate({
  jsonDir: './reports/json',
  reportPath: './reports/enhanced',
  projectName: 'OrangeHRM Test Automation',
  reportName: 'Playwright BDD Execution Report',
  saveCollectedJSON: true,
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'latest'
    },
    device: 'Local Test Machine',
    platform: {
      name: process.platform,
      version: 'Latest'
    }
  },
  customData: {
    title: 'OrangeHRM Test Automation Report',
    data: [
      { label: 'Project', value: 'OrangeHRM Playwright + Cucumber BDD Automation' },
      { label: 'Release', value: 'Week 4 - Leave Module, CI/CD & Reporting' },
      { label: 'Modules Covered', value: 'Login, Dashboard, Admin, PIM, Leave' },
      { label: 'Total Scenarios', value: '30+' },
      { label: 'Browser', value: process.env.BROWSER || 'chromium' },
      { label: 'Environment', value: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com' },
      { label: 'Execution Date', value: new Date().toLocaleDateString() },
      { label: 'Execution Time', value: new Date().toLocaleTimeString() }
    ]
  }
});

console.log('Enhanced HTML report generated successfully!');
console.log('Location: reports/enhanced/index.html');
const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Read cucumber JSON report
const jsonReportPath = path.join(__dirname, '../../reports/cucumber-report.json');
if (!fs.existsSync(jsonReportPath)) {
  console.error('Cucumber JSON report not found. Run tests first: npm test');
  process.exit(1);
}

// Generate enhanced HTML report
report.generate({
  jsonDir: './reports',
  reportPath: './reports/enhanced',
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
      { label: 'Project', value: 'OrangeHRM Automation Framework' },
      { label: 'Release', value: 'Week 2 - Dashboard & Admin Modules' },
      { label: 'Execution Date', value: new Date().toLocaleDateString() },
      { label: 'Execution Time', value: new Date().toLocaleTimeString() }
    ]
  }
});

console.log('Enhanced HTML report generated successfully!');
console.log('Location: reports/enhanced/index.html');
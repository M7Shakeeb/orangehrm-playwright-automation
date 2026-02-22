# Docker Setup Guide

## Prerequisites
- Docker Desktop installed: [Download](https://www.docker.com/products/docker-desktop)
- Docker Compose (included with Docker Desktop)

## Build Docker Image
\`\`\`powershell
npm run docker:build
\`\`\`
OR
\`\`\`powershell
docker-compose build
\`\`\`

## Run Tests in Docker

**Run All Tests**
\`\`\`powershell
npm run docker:test
\`\`\`

**Run Smoke Tests Only**
\`\`\`powershell
npm run docker:test:smoke
\`\`\`

**Run with Specific Browser (Overriding .env)**
\`\`\`powershell
docker-compose run -e BROWSER=firefox playwright-tests npm test
\`\`\`

## View Reports
After tests run, reports are automatically saved to your local machine:
\`\`\`powershell
start reports\cucumber-report.html
\`\`\`

## Troubleshooting

**Issue: Container fails to start**
Solution:
\`\`\`powershell
# Clean up old containers
docker-compose down -v
# Rebuild
docker-compose build --no-cache
\`\`\`

**Issue: Reports not generated**
Solution:
- Check volume mounts in `docker-compose.yml`
- Ensure `reports/` and `screenshots/` directories exist locally

**Issue: Tests hang or timeout**
Solution:
- Ensure timeout in `.env` is adequate: `TIMEOUT=60000`
- Check internet connection (tests access public OrangeHRM demo)
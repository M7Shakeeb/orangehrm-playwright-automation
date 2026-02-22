FROM mcr.microsoft.com/playwright:v1.58.1-jammy

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Create directories for reports and screenshots
RUN mkdir -p reports screenshots

# Run tests
CMD ["npm", "test"]
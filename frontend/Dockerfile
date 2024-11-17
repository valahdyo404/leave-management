# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build for production
RUN npm run build

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "dev"]

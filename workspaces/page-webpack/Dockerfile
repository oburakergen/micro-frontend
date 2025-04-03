# workspaces/shell-app/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the port
EXPOSE 3004

# Start the application
CMD ["npm", "run", "start:dev"]

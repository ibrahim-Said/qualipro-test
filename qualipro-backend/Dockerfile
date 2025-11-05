FROM node:24.11.0-alpine

# Set working directory
WORKDIR /app

# Install dependencies including netcat for checking database connectivity
RUN apk add --no-cache bash netcat-openbsd

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entrypoint script first
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy all source files
COPY . .

# Install sequelize-cli
RUN npm install --save-dev sequelize-cli

# Expose backend port
EXPOSE 3000

# Use the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]
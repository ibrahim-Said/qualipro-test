# Dockerfile for frontend

FROM node:24.11.0-alpine

# Install dependencies
RUN apk add --no-cache bash

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for dependency installation
COPY package*.json ./


# Now copy the entire Quasar frontend project into the container
COPY . . 

# Install Quasar globally
RUN npm install -g quasar-cli@0.6.5

# Install the dependencies
RUN npm install

# Prepare the Quasar project
# RUN quasar prepare

# Expose the app port (default is 8080 for dev mode)
EXPOSE 8080

# Start the app
CMD ["npm", "run", "dev"]

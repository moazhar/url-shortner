# Use Node.js 20 with Alpine as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install TypeScript globally
RUN npm install typescript -g

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the entire project to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Copy package.json and package-lock.json to the dist directory
RUN cp package*.json dist/

# Copy the 'view' directory from src to dist/src
RUN cp -r ./src/view dist/src

# Set the command to run the application
CMD [ "node", "dist/src/app.js" ]

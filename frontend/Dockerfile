# Stage 1: Build the React app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY my-react-app/package.json src/package-lock.json ./

# Install the dependencies using npm ci (for clean and fast installation)
RUN npm ci

# Copy the rest of the app's source code into the container
COPY my-react-app/src/ .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built React app from the builder stage to Nginx's public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the Nginx configuration file (make sure to create this file, explained below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

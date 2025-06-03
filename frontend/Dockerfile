# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY my-react-app/package.json my-react-app/package-lock.json ./
RUN npm ci
COPY my-react-app .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
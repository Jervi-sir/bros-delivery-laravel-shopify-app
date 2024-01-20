FROM composer:latest AS builder
WORKDIR /var/www
COPY . /var/www
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

FROM node:latest
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM php:8.3-apache
WORKDIR /var/www
COPY --from=builder /var/www .
EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]

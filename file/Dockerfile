FROM sovichea10/laravel-app-php:8.1-fpm-nginx

EXPOSE 8000

WORKDIR /var/www

COPY .  /var/www

RUN rm -f composer.lock
RUN composer install

CMD php artisan --host=0.0.0.0 serve

FROM lorisleiva/laravel-docker:8.1
RUN apk add grpc
EXPOSE 8000

WORKDIR /var/www

# Increase Upload Max File Size
COPY ./custom.ini /usr/local/etc/php/conf.d/custom.ini

COPY .  /var/www

RUN rm -f composer.lock
RUN composer install
RUN php artisan cache:clear
RUN php artisan config:clear
# RUN cp .env.example .env
# RUN php artisan key:generate

CMD php artisan --host=0.0.0.0 serve

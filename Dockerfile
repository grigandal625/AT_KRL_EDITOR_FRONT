FROM node:current-buster AS build-stage
WORKDIR /app/

COPY ./package* ./
RUN npm install

COPY ./config /app/config
COPY ./public /app/public
COPY ./scripts /app/scripts
COPY ./src /app/src
COPY ./.env /app/
 
RUN npm run build

FROM nginx:latest AS production-stage

COPY ./docker/nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE ${PORT}
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

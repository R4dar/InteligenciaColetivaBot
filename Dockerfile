# --- lunhg/assistente:build ---
FROM node:8.11.3-jessie as build
COPY . /var/www/
WORKDIR /var/www/
ENTRYPOINT yarn install --production

# --- lunhg/assistente:master ---
FROM build as master
EXPOSE 3000
CMD npm --prefix=/var/www run start


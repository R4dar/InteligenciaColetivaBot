# --- lunhg/assistente:master ---
FROM node:8.11.3-jessie as master
ENV NODE_ENV=production
COPY . /var/www/
WORKDIR /var/www/
RUN yarn install --production
EXPOSE 3000
CMD npm --prefix=/var/www run start

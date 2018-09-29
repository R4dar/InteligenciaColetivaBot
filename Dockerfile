# --- lunhg/assistente:master ---
FROM mhart/alpine-node:10 as master
ENV NODE_ENV=production
COPY . /var/www
WORKDIR /var/www/
RUN apk add git && \
    yarn --production
EXPOSE 3000
CMD npm --prefix=/var/www run start

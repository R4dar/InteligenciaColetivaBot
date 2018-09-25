# --- lunhg/assistente:master ---
FROM node:8.11.3-jessie as master
ENV NODE_ENV=production
COPY . /var/www/
WORKDIR /var/www/
RUN yarn install --production
EXPOSE 3000
CMD npm --prefix=/var/www run start

# --- lunhg/assistente:docs ---
FROM master as docs
ENV GLOBIGNORE=docs/**
RUN rm -v ** && unset GLOBIGNORE && yarn add serve 
WORKDIR /var/www/docs/src
EXPOSE 3001
CMD ./node_modules/serve/bin/serve





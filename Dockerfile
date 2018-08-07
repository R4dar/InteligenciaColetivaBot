FROM forumi0721alpineaarch64/alpine-aarch64-nodejs-docker-hub-api

RUN apk --no-cache add git
RUN npm config set unsafe-perm true
RUN npm install -g yarn localtunnel

WORKDIR /var/www/Assistente
COPY . /var/www/Assistente
RUN echo "HOST=$HOST" >> .env
RUN echo "PORT=$PORT" >> .env
RUN echo "AUDIENCE=https://$SUBDOMAIN.localtunnel.me" >> .env
RUN yarn install
RUN npm run coverage

# Expose port 3000
EXPOSE $PORT

# start app
RUN lt --port $PORT --subdomain $SUBDOMAIN

CMD ["HOST=localhost", "PORT=3000", "SUBDOMAIN=r4dar", "npm", "--prefix=$WWW", "run", "start"]
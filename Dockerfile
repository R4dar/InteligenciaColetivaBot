# --- Base Node ---
FROM forumi0721alpineaarch64/alpine-aarch64-nodejs as build
WORKDIR /var/www/Assistente
COPY . /var/www/Assistente
RUN apk --no-cache add git && \
    npm config set unsafe-perm true && \
    npm install -g yarn

ENTRYPOINT ["node", "--version"]

# --- dependencies assistente ---
FROM build as dependencies
RUN yarn install


# --- test assistente ---
FROM dependencies as test
RUN npm test

# --- Release production mode ---
FROM dependencies as release
EXPOSE 3000
CMD npm --prefix=/var/www/Assistente run start

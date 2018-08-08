# --- Base Node ---
FROM zenika/alpine-node:onbuild-yarn as build
WORKDIR /var/www/Assistente
COPY . /var/www/Assistente
RUN npm config set unsafe-perm true

# --- dependencies assistente ---
FROM build as dependencies
RUN yarn install

# --- test assistente ---
FROM dependencies as test
RUN npm test

# --- Release production mode ---
FROM dependencies as release
EXPOSE 8080
CMD npm --prefix=/var/www/Assistente run start
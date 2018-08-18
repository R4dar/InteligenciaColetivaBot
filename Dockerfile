# --- lunhg/assistente:build ---
FROM node:8.11.3-jessie as build
ARG APP_NAME=r4dar

USER node
COPY . /home/node/${APP_NAME}
WORKDIR /home/node/${APP_NAME}
RUN npm config set unsafe-perm true && \
    yarn install

# --- lunhg/assistente:master ---
FROM build as master
CMD npm --prefix=/home/node/${APP_NAME} run start

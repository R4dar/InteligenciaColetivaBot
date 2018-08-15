# --- lunhg/assistente:build ---
FROM node:8.11.3-jessie as build
ARG UID=1234
ARG GROUPNAME=node
ARG USERNAME=assistente
ARG APP_NAME=r4dar
RUN useradd -g ${GROUPNAME} -u ${UID} -m ${USERNAME}
USER ${USERNAME}
COPY . /home/${USERNAME}/${APP_NAME}
WORKDIR /home/${USERNAME}/${APP_NAME}
RUN npm config set unsafe-perm true && \
    npm install -g yarn && \
    yarn install && \
    npm config set unsafe-perm false

# --- lunhg/assistente:test ---
FROM build as test
RUN npm run eslint && \
    npm run coverage && \
    cp -r /home/${USERNAME}/${APP_NAME}/test/data /home/${USERNAME}/ && \
    npm run clean && \
    rm -rf /home/${USERNAME}/assistente/node_modules && \
    yarn install --production

# --- lunhg/assistente:master ---
FROM test as master
CMD npm --prefix=/home/${USERNAME}/assistente run start

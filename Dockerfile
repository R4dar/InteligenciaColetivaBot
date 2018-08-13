# --- lunhg/assistente:build ---
FROM node:8.11.3-jessie as build
ARG GUID
ARG USERNAME
ARG UID
RUN apt-get install git adduser addgroup && \
    addgroup -g ${GUID} -S ${USERNAME} && \
    adduser -S -G ${USERNAME} -u ${UID} -s /bin/bash -h /home/${USERNAME} ${USERNAME}
    
# --- lunhg/assistente:global_dependencies ---
FROM build as global_dependencies
RUN npm config set unsafe-perm true && \
    npm install -g yarn && \
    npm config set unsafe-perm false

# --- lunhg/assistente:dependencies ---
FROM global_dependencies as dependencies
USER ${USERNAME}
COPY . /home/${USERNAME}/assistente
WORKDIR /home/${USERNAME}/assistente
RUN yarn install

# --- lunhg/assistente:eslint ---
FROM dependencies as eslint
RUN npm run eslint

# --- lunhg/assistente:test ---
FROM eslint as test
RUN npm test

# --- lunhg/assistente:coverage ---
FROM test as coverage
RUN npm run coverage
RUN npm run clean && rm -rf /home/${USERNAME}/assistente/node_modules
RUN yarn install --production

# --- lunhg/assistente:production ---
FROM coverage as production
CMD npm --prefix=/home/${USERNAME}/assistente run start
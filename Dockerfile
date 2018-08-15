# --- lunhg/assistente:build ---
FROM node:8.11.3-jessie as build
ARG GUID=1000
ARG UID=1000
ARG GROUPNAME=node
ARG USERNAME=assistente
RUN apt-get install git && \
    groupadd -g ${GUID} && ${GROUPNAME} \
    useradd -G ${GROUPNAME} -u ${UID} -s /bin/bash -h /home/${USERNAME} ${USERNAME}
    
# --- lunhg/assistente:global_dependencies ---
FROM build as dependencies

# --- lunhg/assistente:dependencies ---
FROM global_dependencies as dependencies
USER ${USERNAME}
COPY . /home/${USERNAME}/assistente
WORKDIR /home/${USERNAME}/assistente
RUN npm config set unsafe-perm true && \
    npm install -g yarn && \
    npm config set unsafe-perm false && \
    yarn install

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

# --- lunhg/assistente:master ---
FROM coverage as master
CMD npm --prefix=/home/${USERNAME}/assistente run start
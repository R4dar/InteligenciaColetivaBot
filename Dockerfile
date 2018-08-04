FROM forumi0721/alpine-aarch64-base:latest
MAINTAINER lunhanig@gmail.com <lunhanig@gmail.com>

# Install dependencies
RUN apk -U upgrade && \
    apk -U add --no-cache curl ca-certificates && \
    update-ca-certificates 

# setup nvm
ENV NODE_VERSION 8.5.0
ENV NVM_DIR /usr/local/nvm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh -o /tmp/install.sh
RUN chmod +x /tmp/install.sh
RUN /bin/sh /tmp/install.sh
RUN rm /tmp/install.sh
RUN source $NVM_DIR/nvm.sh
RUN $NVM_DIR/nvm install $NODE_VERSION
RUN $NVM_DIR/nvm alias default $NODE_VERSION
RUN $NVM_DIR/nvm use default

# setup nvm
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install localtunnel
RUN npm install -g localtunnel

# Prepare server
RUN mkdir /var/www/
RUN mkdir /var/www/log
WORKDIR /var/www
VOLUME /var/www/log

# Copy files
COPY . /var/www

# install dependencies, test and coverage
RUN yarn install && \
    npm run coverage

# Expose port 3000, where the app runs
EXPOSE 3000

# Run proxy to enable telegram button
RUN lt --port 3000 --subdomain r4dar

# start app
CMD ["npm start"]
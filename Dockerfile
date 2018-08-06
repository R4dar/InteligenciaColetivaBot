FROM forumi0721/alpine-aarch64-base:latest
MAINTAINER lunhanig@gmail.com <lunhanig@gmail.com>

# Install dependencies
RUN apk -U upgrade && \
    apk -U add --no-cache sed curl ca-certificates git nginx bash ca-certificates openssl ncurses coreutils python2 make gcc g++ libgcc linux-headers grep util-linux binutils findutils && \
    update-ca-certificates 

# Clone files
ENV WWW=/var/www
ENV REPO_PATH=https://www.github.com/lunhg/Assistente.git
ENV APP_NAME=r4dar
ENV NGINX_REVERSE_PROXY=/etc/nginx/conf.d
RUN rm -rf $WWW
RUN mkdir $WWW
RUN git clone $REPO_PATH $WWW/Assistente

# setup nginx as reverse proxy
RUN cp $WWW/Assistente/assistente.conf $NGINX_REVERSE_PROXY/default.conf

# Edit configuration file
RUN sed -i -- 's/PORT/80/g' $NGINX_REVERSE_PROXY/default.conf
RUN sed -i -- 's/SERVER/r4dar/g' $NGINX_REVERSE_PROXY/default.conf
RUN sed -i -- 's/NODEJS/3000/g' $NGINX_REVERSE_PROXY/default.conf
RUN cat $NGINX_REVERSE_PROXY/default.conf

# setup nvm
ENV NODE_VERSION=8.5.0
ENV NVM_DIR=/usr/lib/nvm
ENV NVM_VERSION=0.33.11
RUN rm -rf $NVM_DIR
RUN git clone https://github.com/creationix/nvm.git $NVM_DIR
RUN cd $NVM_DIR && git checkout tags/v$NVM_VERSION -b dockerized && cd -
RUN /bin/sh $NVM_DIR/install.sh
RUN chmod +x $NVM_DIR/nvm.sh
RUN $NVM_DIR/nvm.sh install -s $NODE_VERSION
RUN $NVM_DIR/nvm.sh use v$NODE_VERSION

# Install yarn and localtunnel
RUN $NVM_DIR/nvm.sh run npm install -g yarn localtunnel

# install dependencies, test and coverage
RUN ls $WWW/Assistente
RUN cd $WWW/Assistente && $NVM_DIR/nvm.sh run yarn install && cd -
RUN $NVM_DIR/nvm.sh run npm --prefix $WWW_PATH/Assistente run coverage
 
# Expose port 3000, where the app runs
EXPOSE 80

# start app
RUN $NVM_DIR/nvm.sh run lt --port 80 --subdomain r4dar
CMD ["$NVM_DIR/nvm.sh run npm --prefix $WWW_PATH/Assistente run start"]
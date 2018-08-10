FROM stevenaldinger/alpine-nodejs-dev as build
RUN apk --no-cache add git
RUN npm config set unsafe-perm true
RUN npm install -g yarn
WORKDIR /var/www/Assistente
COPY . /var/www/Assistente
RUN yarn install
CMD npm --prefix=/var/www/Assistente run start
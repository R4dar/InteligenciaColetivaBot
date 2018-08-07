# assistente

> assistente-backend

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Setup and Building

### Docker

The [Dockerfile](/Dockerfile) is an [alpine-aarch64 based image node.js](https://hub.docker.com/r/forumi0721alpineaarch64/alpine-aarch64-nodejs-docker-hub-api/), yarn and [localtunnel](https://www.npmjs.com/package/localtunnel).

Change the section `FROM ...` to fit your needs. The following command runs the default configuration:

```
$ docker run -t lunhg/assistente
```

But you can change:


```
$ docker run -t lunhg/assistente HOST=localhost PORT=3000 SUBDOMAIN=r4dar
```

### Manually

Install dependencies first with `npm` or `yarn`.

### Node Package manager

```
npm install
```

### Yarn (recomended)

```
yarn install
```


In your package.json, set the running mode, i.e, development, test, production or custom mode:

```
{
  ...
  "scripts": {
    "start": "NODE_ENV='<environment mode>' node src/"
  } 
  ...
}
```

Where, `<environment mode>` can be any json file found in `config/` folder. These files are a set of configurations for database, express, passport, telegram, cookies, jwt and swagger. The `default.json` file is relative to `development` mode:

- `development` mode: edit your `config/default.json`
- `production` mode: edit your `config/production.json`
- `custom` mode: edit your `config/<custom mode>.json`


Among serveral configurations made by default, you will need to setup some credentials:

  - your Telegram username, telegram token and bot administrators:; 
  - your database access credentials;
  - open id credentials;

So, `cp .env.template .env` and do properly changes:

```
TELEGRAM_USERNAME=<BOT> 
TELEGRAM_TOKEN=<TOKEN>
TELEGRAM_ADMINS="<chaid 1> <chatid 2> <chatid 3>"
MONGODB_USER=<user>
MONGODB_PWD=<pwd>
MONGODB_HOST=<host>
MONGODB_PORT=<port>
MONGODB_DBNAME=<name>
OPENID_CLIENT_ID=<clientid>
OPENID_CLIENT_SECRET=<clientsecret>
AUDIENCE=<your bot domain>
AUTHENTICATION_SECRET=<senha de cookie>
```

and add the following variables: `HOST`, `PORT` and `AUDIENCE`.

##### Running

###### Database

If you are using a local server, starts the database with [authentication](https://docs.mongodb.com/manual/reference/program/mongo/#mongo-shell-authentication-options)

```
$ sudo mongod --dbpath /data/db [...args] &
```

If you are using a remote database, simply insert the adequated credentials in environment variables. The variables started with `MONGODB_*` will be joined to `MONGODB_URL` (see `src/dotenv.js`).

###### Server

```
$ npm run start
```

###### Telegram and remote access

This server will use `src/views/index.tml` (`tml` is a customized html template with properly environment variables inserted in html and js code) as `GET /`.

If you run and access this as `localhost:*`, you will see a `Bot domain invalid` message in the place of telegram button.

To solve this, you will need to run a valid domain name to the bot and place this as `AUDIENCE` variable in `.env` file, and run a tunnel:

#### Tunnel

Tunnel, in this application, is the usage of [localtunnel](https://www.npmjs.com/package/localtunnel) CLI. This will get our `localhost` server and expose this to a secure proxy on the internet. :

```
npm install -g localtunnel
```

Before run localtunnel, keep in mind that you will need use a fixed proxy, or in other words, the same domain registered in [BotFather](tg://resolve?domain=botfather&start=true)

And run, as a service, a child processes or a another background command:

```
lt --port <ACCESS_PORT> --subdomain <SUBDOMAIN>
```

If you like nginx, you can use a [reverse proxy](/assistente.conf) and use:

```
lt --port 80 --subdomain <SUBDOMAIN>
```

## Info

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog


__ 0.1.14__

- /bot
  - Added GET /bot as pre-compiler of message to POST /bot
- Issuer
  - melhorado serviço do cliente
  - todo:
	- cliente executa, mas obtem erro de acesso
	- [issue](https://github.com/R4dar/InteligenciaColetivaBot/issues/2) 


__ 0.1.13__

- Grupos
  - Added /grupos to API
- Issuer
  - Added /issuer to API

__0.1.12__

- Tests
  - Added some CRUD tests in `/bot` and `/users`
- Simplified index.html
- added `after` and `before` hooks to `users` service, where we eill send messages

__0.1.11__

- Bot service
  - Setup bot and send message to adminstrators at runtime
  - Implemented the cycle of first messages as website dashboard (with telegram keyboards)
  - Fixed unhandledErrors

__0.1.1__

- Bot service
  - `POST /bot` and requires (TODO require authentication), and a `data` with the following properties:
	- `id` of the user where a message will be sent
	- a `message`,  a `object` with properties `type` (a `string` or `keyboard`) and `value`:
	  - if `type` is `string`, then `value`  needs to be a `string`
	  - if `type` is `keyboard`, then `value`  needs to be an array of object, defined in methods triggered by `./src/bot.js`
  

__0.1.0__

- Initial release:
  - Have a backend authentication with a `auth0Id` as parameter, most likely used to be a telegram authorization 
  - `GET`, `POST` messages to `/users`
  - `GET`, `PATCH`, `DELETE` messages to `/users/:id`
  
## License

CC BY-SA 4.0

Licensed under the [CC-BY-SA license](LICENSE).

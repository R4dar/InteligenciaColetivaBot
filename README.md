# assistente

> assistente-backend

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Building

### Node Package manager

```
npm install
```

### Yarn (recomended)

```
yarn install
```

### Setup


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

So, cp the .env.template to a properly .env file:

```
HOST=<HOST> 
PORT=<PORT>
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


## Running

### Database

If you are using a local server, starts the database.

```
$ sudo mongod --dbpath /data/db &
```

### Server

```
$ npm run start
```

If you are using local server, install [localtunnel](https://www.npmjs.org/localtunnel), setup you bot domain as something like `https://abcdefg.localtunnel.me` and run:

```
$ lt --port <your dev port> --subdomain abcdefg
```

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

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

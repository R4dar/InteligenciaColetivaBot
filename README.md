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


Among serveral configurations made by default, you will need to setup two credentials, your Telegram username and your telegram token:

```
{
  ...
  "telegram": {
    "username": "<your bot username>",
	"token": "<your api token>"
  },
  ...
}
```

## Running

Now run server:

```
$ npm run start
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

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

CC-BY-SA 4.0

Licensed under the [CC-BY-SA license](LICENSE).

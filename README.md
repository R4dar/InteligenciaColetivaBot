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


Among serveral configurations made by default, you will need to setup two credentials, your Telegram username and your database access credentials, telegram token, open id credentials and setup the bot administrators:

```
{
  "mongodb": "mongodb://<username>:<password>@<host>:<port>/assistente",
  ...
  "openid": {
      "clientID": "<your open id client>",
      "clientSecret": "<your open id secret>",
      "successRedirect": "/",
      "domain": "localhost:3000",
      "scopes": [
        "openid email"
      ]
  },
  "telegram":{
      "username": "<your bot username>",
      "token": "<your bot token>",
      "whitelist": [
	     "<your personal chat id>"
      ]
  }
  ...
}
```

Initialize your database

```
$ sudo mongod --dbpath /data/db &
```

Now add, directly in database, two users: the bot user and your data as administrators:

```
$ mongo
$ use assistente
$ var user = {telegramId: "R4DARDEV_bot", isAdmin: true, isVerified: true, verifyToken: "<create a token here>"}
$ db.users.create(user)
$ var user = {telegramId: "<your personal chatid>", isAdmin: true, isVerified: true, verifyToken: "<create a token here>"}
$ db.users.create(user)
$ db.users.find({})
```

## Running

Now run server:

```
$ npm run start
```

You should see a log running like this:

```
node-telegram-bot-api deprecated Automatic enabling of cancellation of promises is deprecated.
In the future, you will have to enable it yourself.
See https://github.com/yagop/node-telegram-bot-api/issues/319. module.js:624:30
(node:27681) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
[winston] Attempt to write logs with no transports {"message":"Feathers application started on http://localhost:3030","level":"info"}
[winston] Attempt to write logs with no transports {"message":"dropping users unless they are admin","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"before app.service('users').find()","level":"debug"}
[winston] Attempt to write logs with no transports {"level":"debug","message":"Hook Context"}
(node:27681) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
[winston] Attempt to write logs with no transports {"message":"after app.service('users').find()","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Found 2 users","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"User 5b43575de5e13b10f877da75 is admin","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"User 5b4357bae5e13b10f877da76 is admin","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"before app.service('bot').create()","level":"debug"}
[winston] Attempt to write logs with no transports {"level":"debug","message":"Hook Context"}
[winston] Attempt to write logs with no transports {"message":"before app.service('bot').create()","level":"debug"}
[winston] Attempt to write logs with no transports {"level":"debug","message":"Hook Context"}
[winston] Attempt to write logs with no transports {"id":"R4DARDEV_bot","message":{"type":"keyboard","value":["Sistema Online!",{"reply_markup":{"keyboard":[["/start"]]}}]},"level":"debug"}
[winston] Attempt to write logs with no transports {"id":"XXXXXXXX","message":{"type":"keyboard","value":["Sistema Online!",{"reply_markup":{"keyboard":[["/start"]]}}]},"level":"debug"}
[winston] Attempt to write logs with no transports {"message":"after app.service('bot').create()","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"after app.service('bot').create()","level":"debug"}
```
## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

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

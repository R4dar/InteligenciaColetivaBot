# assistente

> assistente-backend

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/assistente; npm install
    ```

3. Start your app

    ```
    npm start
    ```

This will run a backend server on `localhost:3030`

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Running

In your package.json to set if you run in development, test, production or deploy mode:

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
    "username": "R4DARDEV_bot",
	"token": "<your api token>"
  },
  ...
}
```

Now run server:

```
$ npm run start
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release:
  - Have a backend authentication with a `auth0Id` as parameter, most likely used to be a telegram authorization 
  - `GET`, `POST` messages to `/users`
  - `GET`, `PATCH`, `DELETE` messages to `/users/:id`
  
## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).

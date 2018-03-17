# sick in tech
Resources for accessibility and visibility for invisible illnesses in tech.

## tech stack
* MongoDB
* ExpressJS + NodeJS
* Pug
* Webpack
* Mocha (testing) + Docker

## app set up
1. Create `variables.env` file with the following information:
```
NODE_ENV=development
DATABASE=
MAIL_USER=
MAIL_PASS=
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
PORT=7777
SECRET=
KEY=
```
You'll need a MailTrap.io account (or replace with actual mail host account info), and a mongo db connection string.

2. Run `npm install`
3. Run `npm run start` and open browser to `localhost:7777`

## running tests
In order to run unit tests, you'll need to spin up a docker container `docker-compose up` before running the `npm test` command.
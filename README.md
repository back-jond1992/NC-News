# Jack's NC News

Jack' NC news is a basic API for the purpose of accessing application data programmatically. This project is designed to mimic the building of a real world backend service (such as reddit).

Jack's NC news allows users to make GET, PATCH, POST and DELETE requests to the server.

The API is hosted here: https://jacks-news.herokuapp.com/api .

Available Endpoints

#### GET /api

#### GET /api/topics

#### GET /api/articles

#### GET /api/articles/:article_id

#### PATCH /api/articles/:article_id

#### GET /api/articles/:article_id/comments

#### POST /api/articles/:article_id/comments

#### DELETE /api/comments/:comment_id

#### PATCH /api/comments/:comment_id

#### GET /api/users

#### GET /api/users/:username

### Getting Started

First clone repository

`git clone https://github.com/back-jond1992/NC-News.git`

Then install dependencies

`npm Install`

Next set up databases

`npm run setup-dbs`

Then seed files

`npm run seed`

And finally

`npm run seed:prod`

### Creating .env files

Two .env files will need to be created: .env.test and .env.development. Into each, add PGDATABASE=nc_news(\_test). Ubuntu users may need to add PGPASSWORD:<yourpasswordhere> Double check that these .env files are .gitignored.

### Requirements

For Jack's NC News to run you will need: `node v16.8.0` and `postgres sql 12.8`.

### Testing

All testing for the API has been written and can be found in the `__tests__` folder.

To run tests

`npm test`

### Starting the server

`npm run start`

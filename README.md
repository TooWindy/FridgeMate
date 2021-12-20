# Fridge Mate

## Description

Hi and welcome to Fridge Mate! This is my stackthon project which I had around 2 days to build for the FSA 2109 cohort. I used the FS-Template to build the foundations. This application is designed to help you come up with recipe ideas based on the current ingredients in your fridge. You can add/delete/update your ingredients and then search for recipes that utilize those types of ingredients. It used the Spoonacular API, to grab recipes. It also includes additional features such as giving you a random recipe NOT based on your fridge contents and some seasonal recipes. A final feature, is giving you directions to create the recipe. To get started, you can sign in using any credentials you wish (You can input any string for your credentials; but please make sure to remember your password if you do so!). The design is pretty bare due to the time constraints but I hope you enjoy using it and I hope it helps you!


* The only limitation of the api is the information was very barebones for less popular recipes, so for some recipes, you may experience some less helpful information.

* In order for this application to work locally, you will need an api key from Spoonacular at https://spoonacular.com/food-api

* Alternatively, you can just access the site using heroku at https://fridgemate2109.herokuapp.com/

## Setup

* Npm install

```
npm install
npm run start:dev
```

## Seeding

* To run the starting seed, use "npm run seed" in the command line, this is just for sample users (cody and murphy).

```
npm run seed
```


### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

  3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno (This creates your production database)

  4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

  5.   note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`


* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.


Now, you should be deployed!

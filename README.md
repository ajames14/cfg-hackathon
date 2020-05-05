### CFG Hack From Home 2020
# **WASTE**NOT**WANT**NOT

by [Abigail James](https://github.com/ajames14), [Charlotte Thomas](https://github.com/Charlotte-Thomas), [Kathrin Eichinger](https://github.com/katheich) & [Marissa Epstein](https://github.com/marepstein)

## Overview

**WASTE**NOT**WANT**NOT is a recipe and food sharing platform, completed as part of the Code First: Girls Hack from Home hackathon in April 2020. 
Our aim is to help users avoid the supermarkets, allow local communities to help each other out in times of need and reduce food waste in the process.
We do this in two ways: 
1) Recipe Finder: When users are short on supplies and lacking inspiration, they can enter up to 5 key ingredients and we provide recipe options to use up these specific items. 
2) Food Community: We’ve created a forum allowing users to connect with people in their postcode area. By simply signing up to their local forum, a user can access help if the need it and provide food if they can spare it.

You can launch the app on Heroku [here](https://waste-not-want-not.herokuapp.com/), or find the GitHub repo [here](https://github.com/ajames14/cfg-hackathon).

NB: We have created a **test account** so you can get a demo of the full functionality of the site. Please login with the following details:
- Email: jbloggs@email.com 
- Password: test-password1

### Find Recipe
![](https://media.giphy.com/media/KFmkUrorheXfBA7bU6/giphy.gif)

### Find Ingredients 
![](https://media.giphy.com/media/Q7YHCXxVnceCRbJawr/giphy.gif)

## Local installation
First, make a local copy by cloning or downloading the repo.

For the front-end:
1. `npm install`
2. `npm run serve:frontend`

For the back-end, in a new terminal:
1. `pipenv install`
2. `pipenv shell`
3. `createdb hackathon`
4. `python manage.py makemigrations`
5. `python manage.py migrate`
6. `npm run serve:backend`

You should now be able to access the page at `localhost:8000`.

## Technologies used
- HTML
- SCSS
- Python
- Django
- PostgreSQL
- JavaScript (ES6)
- React.js
- Spoonacular Food API
- FileStack React
- Webpack
- Dotenv
- Heroku
- Git and GitHub
- Bulma
- Google Fonts
- Adobe Photoshop and Illustrator

## Credit

[Spoonacular Food API](https://spoonacular.com/food-api) by Spoonacular

[Filestack React](https://github.com/filestack/filestack-react)

Fruits icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](www.flaticon.com)

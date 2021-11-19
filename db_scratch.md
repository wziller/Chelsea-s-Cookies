# create user and db in psql:
    CREATE USER chelseas_cookies_user WITH PASSWORD '5F4DCC3B5AA765D61D8327DEB882CF99' CREATEDB;

    CREATE DATABASE chelseas_cookies_db WITH OWNER chelseas_cookies_user;


# in root directory, run this in terminal:
    pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt


# create a .env file and add this:
    FLASK_APP=app
    FLASK_ENV=development
    SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230
    DATABASE_URL=postgresql://chelseas_cookies_user:5F4DCC3B5AA765D61D8327DEB882CF99@localhost/chelseas_cookies_db


# Get into your pipenv shell, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```


# cd into react-app folder and run:
    npm install
    npm start

# setup heroku database
    heroku run -a chelseas-cookies flask db upgrade heroku run -a chelseas-cookies flask seed all


- You should be able to see login prompt at localhost:3000 now (npm start should take you there automatically)

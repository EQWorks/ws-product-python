## Work Sample for Product Aspect, Python Variant

[What is this?](https://github.com/EQWorks/work-samples#what-is-this).

## Setup and Run

A few ways to get started, pick the one you're most comfortable with.

### Glitch

You can [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/EQWorks/ws-product-python) now to get started.

This is the most recommended way since it's one of the easiest to setup (requiring zero local effort), as well the easiest to share.

### Heroku

If you're familiar with [Heroku](https://www.heroku.com/) (free account is sufficient), you can either use that to run locally (`heroku local`) or deploy it to your own dyno to run remotely. To spawn a free Heroku dyno and run on it:

0. Clone this repository
1. Get Heroku setup and have a `heroku` git remote configured for this repository
2. Configure Heroku environment variable `heroku config:set SQL_URI='<SQL connection URI>'`
3. Go to the `work-samples` project root and do `git subtree push --prefix api-python heroku master` (assuming `heroku` is the Heroku remote name)

### Local Python

0. Clone this repository
1. Install Python level dependencies `$ pip install -r requirements.txt` (use of [`virtualenv`](https://virtualenv.pypa.io/en/stable/) is recommended)
2. Run `$ SQL_URI=<SQL connection URI> FLASK_APP=app.py FLASK_DEBUG=1 flask run` and by default it should now be listening on port `5000`
3. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

### Local Docker

0. Clone this repository
1. Store `SQL_URI=<SQL connection URL>` into a `.env` file
2. Run `$ docker-compose up` (or `$ docker-compose up -d` to run in the background)
3. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

_Note_: you'll be given necessary `SQL_URI` environment variable value along with the problem.

## Notes on working through the problems

Make sure any external dependencies are properly added into `requirements.in`, "compiled" through `$ pip-compile requirements.in`, and can be installed using `$ pip install -r requirements.txt`. We encourage a healthy mixture of your own implementations, and good choices of existing open-source libraries/tools. We will comment in the problems to indicate which ones cannot be solved purely through an off-the-shelf solution.

## Hosted version

If you intend to focus on the client-side aspect of the problem set, you can start by leveraging the hosted version at <https://eq-work-samples-api.herokuapp.com>

## Environment

* Python 3.6

## Setup and Run

0. Clone this repository `git clone git@github.com:EQWorks/work-samples.git`
1. Install Python level dependencies `$ pip install -r requirements.txt` (use of [`virtualenv`](https://virtualenv.pypa.io/en/stable/) is recommended)
2. Run `$ SQL_URI=<SQL connection URI> FLASK_APP=app.py FLASK_DEBUG=1 flask run` and by default it should now be listening on port `5000`
3. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

Alternatively, if you're familiar with [Heroku](https://www.heroku.com/) (free account is sufficient), you can either use that to run locally (`heroku local`) or deploy it to your own dyno to run remotely. To spawn a free Heroku dyno and run on it:

0. Clone this repository `git clone git@github.com:EQWorks/work-samples.git`
1. Get Heroku setup and have a `heroku` git remote configured for this repository
2. Configure Heroku environment variable `heroku config:set SQL_URI='<SQL connection URI>'`
3. Go to the `work-samples` project root and do `git subtree push --prefix api-python heroku master` (assuming `heroku` is the Heroku remote name)

Or, if you already have Docker setup and running:

0. Clone this repository and change directory to `api-node`
1. Store `SQL_URI=<SQL connection URL>` into a `.env` file
2. Run `$ docker-compose up` (or `$ docker-compose up -d` to run in the background)
3. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

_Note_: you'll be given necessary `SQL_URI` value along with the problem set

## Notes on working through the problems

Make sure any external dependencies are properly added into `requirements.in`, "compiled" through `$ pip-compile requirements.in`, and can be installed using `$ pip install -r requirements.txt`. We encourage a healthy mixture of your own implementations, and good choices of existing open-source libraries/tools. We will comment in the problems to indicate which ones cannot be solved purely through an off-the-shelf solution.

Your submission should be in the form of your local work sample repository packaged using [`git-archive`](https://git-scm.com/docs/git-archive) command. Do not include anything that's ignored by `.gitignore` file.

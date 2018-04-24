## Work Sample for Product Aspect, Python Variant

[What is this?](https://github.com/EQWorks/work-samples#what-is-this)

## Setup and Run

A few ways to get started, pick the one you're most comfortable with.

All approaches would require a set of environment variables that will be given to you in the problems email:

```bash
SQL_URI=
```

### Glitch

You can [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/EQWorks/ws-product-python) now to get started. Make sure to configure environment variables given in the problem-set email in the `.env` file.

This is the most recommended way since it's one of the easiest to setup (requiring zero local effort), as well the easiest to share.

### Local Python (3.6+)

Assume [`Pipenv`](https://github.com/pypa/pipenv) is installed

0. Clone this repository
1. Install Python level dependencies `$ pipenv install`
2. Run `$ pipenv run SQL_URI=<SQL connection URI> ./start.sh` and by default it should now be listening on port `5000`
3. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

### Local Docker

0. Clone this repository
1. Store `SQL_URI=<SQL connection URL>` into a `.env` file
2. Run `$ docker-compose up` (or `$ docker-compose up -d` to run in the background)
3. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

## Notes on working through the problems

Make sure any external dependencies are properly added into `requirements.in`, "compiled" through `$ pip-compile requirements.in`, and can be installed using `$ pip install -r requirements.txt`. We encourage a healthy mixture of your own implementations, and good choices of existing open-source libraries/tools. We will comment in the problems to indicate which ones cannot be solved purely through an off-the-shelf solution.

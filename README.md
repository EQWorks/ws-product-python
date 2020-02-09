Work Sample for Product Aspect, Python Variant
---

[What is this for?](https://github.com/EQWorks/work-samples#what-is-this)

### Setup and Run

The following are the recommended options, but you're free to use any means to get started.

#### Remote Option: Glitch.com

1. [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/EQWorks/ws-product-python)
2. Open `.env` file and paste in the value of `SQL_URI` [environment variable](https://en.wikipedia.org/wiki/Environment_variable) received from the problem set
3. Click on `Show Live` and you should see `Welcome to EQ Works 😎`

#### Local Option: Python 3.6+

1. Clone this repository
2. Install [pipenv](https://pipenv.readthedocs.io/en/latest/), then install Python level dependencies. `$ pipenv install`
3. Open `.env` file and paste in the value of `SQL_URI` [environment variable](https://en.wikipedia.org/wiki/Environment_variable) received from the problem set
4. Run `$ pipenv run start`
5. Open your browser and point to `localhost:5000` and you should see `Welcome to EQ Works 😎`

### Notes on working through the problems

Make sure any additional Python level dependencies are properly added in `Pipfile`. We encourage a healthy mixture of your own implementations, and good choices of existing open-source libraries/tools. We will comment in the problems to indicate which ones cannot be solved purely through an off-the-shelf solution.

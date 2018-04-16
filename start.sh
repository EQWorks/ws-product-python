#!/usr/bin/env bash
# for dev
FLASK_APP=app.py flask run
# for prod
# gunicorn app:app --log-file -

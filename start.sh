#!/usr/bin/env bash
# for dev
FLASK_APP=backend.app.py FLASK_DEBUG=1 flask run
# for prod
# gunicorn app:app --log-file -

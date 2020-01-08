#!/usr/bin/env bash
# for dev
#FLASK_APP=backend.app.py FLASK_DEBUG=1 flask run
# for prod
python backend/app.py
# gunicorn app:app --log-file -

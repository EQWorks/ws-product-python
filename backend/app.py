# -*- coding: utf-8 -*-

import os
from flask import Flask, jsonify, render_template
import sqlalchemy

from .rate_limiter import RateLimiter


# web app
app = Flask(__name__)

# database engine
engine = sqlalchemy.create_engine(os.getenv('SQL_URI'))

# rate limiter
limiter = RateLimiter()


@app.route('/')
def index():
    return 'Welcome to EQ Works 😎'


@app.route('/events/hourly')
def events_hourly():
    return queryHelper('''
        SELECT date, hour, events
        FROM public.hourly_events
        ORDER BY date, hour
        LIMIT 168;
    ''')


@app.route('/events/daily')
def events_daily():
    return queryHelper('''
        SELECT date, SUM(events) AS events
        FROM public.hourly_events
        GROUP BY date
        ORDER BY date
        LIMIT 7;
    ''')


@app.route('/stats/hourly')
def stats_hourly():
    return queryHelper('''
        SELECT date, hour, impressions, clicks, revenue
        FROM public.hourly_stats
        ORDER BY date, hour
        LIMIT 168;
    ''')


@app.route('/stats/daily')
def stats_daily():
    return queryHelper('''
        SELECT date,
            SUM(impressions) AS impressions,
            SUM(clicks) AS clicks,
            SUM(revenue) AS revenue
        FROM public.hourly_stats
        GROUP BY date
        ORDER BY date
        LIMIT 7;
    ''')

@app.route('/poi')
def poi():
    return queryHelper('''
        SELECT *
        FROM public.poi;
    ''')

def queryHelper(query):
    # Return the data if total calls to database-related methods are within
    # rate limit parameters
    if limiter.attempt_access():
        with engine.connect() as conn:
            result = conn.execute(query).fetchall()
            return jsonify([dict(row.items()) for row in result])

    # TODO: Include message or some sort of request code that returns with None
    else:
        return dict()


@app.route('/test')
def test():
    return render_template("index.html", token = "Hellow World")


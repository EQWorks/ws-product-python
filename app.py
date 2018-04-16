# -*- coding: utf-8 -*-

import os
from flask import Flask, jsonify
import sqlalchemy

# web app
app = Flask(__name__)

# database engine
engine = sqlalchemy.create_engine(os.getenv('SQL_URI'))


@app.route('/')
def index():
    return 'Welcome to EQ Works 😎'


@app.route('/events/hourly')
def events_hourly():
    return queryHelper('''
        SELECT date, hour, SUM(events) AS events
        FROM public.hourly_events
        GROUP BY date, hour
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
        SELECT date, hour,
            SUM(impressions) AS impressions,
            SUM(clicks) AS clicks,
            SUM(revenue) AS revenue
        FROM public.hourly_stats
        GROUP BY date, hour
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


def queryHelper(query):
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()
        return jsonify([dict(row.items()) for row in result])

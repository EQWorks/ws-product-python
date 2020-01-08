# -*- coding: utf-8 -*-

import os
from flask import Flask, jsonify, render_template
import sqlalchemy
import json
import datetime
import ast
import decimal

from rate_limiter import RateLimiter


# web app
app = Flask(__name__)


# database engine
# TODO: Fix the environment variable for the final version by replacing the parameter below with:
# os.getenv('SQL_URI')
engine = sqlalchemy.create_engine(os.getenv('SQL_URI'))

# rate limiter
limiter = RateLimiter()


@app.route('/')
def index():
    text = 'Welcome to EQ Works 😎<br/><br/>'
    
    text += 'Endpoints<br/>'
    text += '/: You\'re already here 😁😁😁<br/>'
    text += '/events/hourly: Events sorted by hour (Rate limited)<br/>'
    text += '/events/daily: Events sorted by day (Rate limited)<br/>'
    text += '/stats/hourly: Stats sorted by hour (Rate limited)<br/>'
    text += '/stats/daily: Stats sorted by day (Rate limited)<br/>'
    text += '/database: Query the database to look at tables and columns (Rate limited)<br/>'
    text += '/visuals: UI interface for the data<br/><br/>'
    
    text += 'Github link <a href="https://github.com/EstaticShark/ws-product-python">here</a><br/>'
    text += 'Short response provided via README.md in the above link'
    
    return text


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

#Test api for querying database
@app.route('/database')
def return_database():
    if limiter.attempt_access():
      data_labels = {}
      m = sqlalchemy.MetaData()
      m.reflect(engine)
      for table in m.tables.values():
          data_labels[table.name] = []
          for column in table.c:
            data_labels[table.name].append(column.name)
      return jsonify(data_labels)
    else:
      return jsonify(dict())


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

def default_handler (obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    else:
        obj.isoformat()
        if isinstance(obj, (datetime.datetime, datetime.date)):
            return obj.isoformat()
        else:
            return None

@app.route('/visuals')
def render_visuals():
    with engine.connect() as conn:
        eventsHourly =  json.dumps([dict(row.items()) for row in (conn.execute('''
                            SELECT date, hour, events, poi_id
                            FROM public.hourly_events
                            ORDER BY date, hour
                            LIMIT 168;
                        ''').fetchall())], default=default_handler)

        eventsDaily =   json.dumps([dict(row.items()) for row in (conn.execute('''
                            SELECT date, SUM(events) AS events
                            FROM public.hourly_events
                            GROUP BY date
                            ORDER BY date
                            LIMIT 7;
                        ''').fetchall())], default=default_handler)

        statsHourly =   json.dumps([dict(row.items()) for row in (conn.execute('''
                            SELECT date, hour, impressions, clicks, revenue, poi_id
                            FROM public.hourly_stats
                            ORDER BY date, hour
                            LIMIT 168;
                        ''').fetchall())], default=default_handler)

        statsDaily =    json.dumps([dict(row.items()) for row in (conn.execute('''
                            SELECT date,
                                SUM(impressions) AS impressions,
                                SUM(clicks) AS clicks,
                                SUM(revenue) AS revenue
                            FROM public.hourly_stats
                            GROUP BY date
                            ORDER BY date
                            LIMIT 7;
                        ''').fetchall())], default=default_handler)

        poiInfo =       json.dumps([dict(row.items()) for row in (conn.execute('''
                            SELECT *
                            FROM public.poi;
                        ''').fetchall())], default=default_handler)
        
        return render_template( "index.html",
                                token = "Hello World",
                                eventsHourly = eventsHourly,
                                eventsDaily = eventsDaily,
                                statsHourly = statsHourly,
                                statsDaily = statsDaily,
                                poiInfo = poiInfo)
        return jsonify(dict())
    
if __name__ == '__main__':
  app.run(debug=True)


import os

from flask import Flask, jsonify
import sqlalchemy as sa

# web app
app = Flask(__name__)

# database engine
SQL_URI = sa.engine.URL.create(
    drivername='postgresql',
    username=os.getenv('PGUSER', ''),
    password=os.getenv('PGPASSWORD', ''),
    host=os.getenv('PGHOST', ''),
    database=os.getenv('PGDATABASE', ''),
    port=os.getenv('PGPORT', 5432),
)
engine = sa.create_engine(SQL_URI)


@app.route('/')
def index():
    return 'Welcome to EQ Works 😎'


@app.route('/events/hourly')
def events_hourly():
    return query_helper('''
        SELECT date, hour, events
        FROM public.hourly_events
        ORDER BY date, hour
        LIMIT 168;
    ''')


@app.route('/events/daily')
def events_daily():
    return query_helper('''
        SELECT date, SUM(events) AS events
        FROM public.hourly_events
        GROUP BY date
        ORDER BY date
        LIMIT 7;
    ''')


@app.route('/stats/hourly')
def stats_hourly():
    return query_helper('''
        SELECT date, hour, impressions, clicks, revenue
        FROM public.hourly_stats
        ORDER BY date, hour
        LIMIT 168;
    ''')


@app.route('/stats/daily')
def stats_daily():
    return query_helper('''
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
    return query_helper('''
        SELECT *
        FROM public.poi;
    ''')


def query_helper(query):
    with engine.connect() as conn:
        result = conn.execute(query).fetchall()
        return jsonify([dict(row.items()) for row in result])

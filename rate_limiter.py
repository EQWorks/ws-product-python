import datetime as dt
import time

class RateLimiter():
    _MAX_REQUESTS = 180
    _REQUESTS_RESET_TIME = 3600

    _requests_made = 0
    _first_request_time = dt.datetime.now()

    def __init__(self):
        pass

    def attempt_access (self):
        # Updates the requests to check if the request queue has maxed
        self._update_requests()

        if self._requests_made < self._MAX_REQUESTS:
            self._requests_made += 1
            return True

        else:
            return False


    def _update_requests(self):
        access_time = dt.datetime.now()
        time_diff = (access_time.__sub__(self._first_request_time)).total_seconds()
        if time_diff >= self._REQUESTS_RESET_TIME:
            _requests_made = 0
            self._first_request_time = access_time

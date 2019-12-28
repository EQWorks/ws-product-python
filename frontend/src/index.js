import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App 
    token={ window.token }
    eventsHourly={ window.eventsHourly }
    eventsDaily={ window.eventsDaily }
    statsHourly={ window.statsHourly } 
    statsDaily={ window.statsDaily }
    poiInfo={ window.poiInfo }
    />, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

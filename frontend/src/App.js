import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventsHourlyTable from './Tables/EventsHourlyTable'
import EventsDailyTable from './Tables/EventsDailyTable'
import StatsHourlyTable from './Tables/StatsHourlyTable'
import StatsDailyTable from './Tables/StatsDailyTable'
import VisualMap from './Maps/VisualMap'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      token: window.token,
      eventsHourly: JSON.parse(window.eventsHourly.replace(/&#34;/g, "\"")),
      eventsDaily: JSON.parse(window.eventsDaily.replace(/&#34;/g, "\"")),
      statsHourly: JSON.parse(window.statsHourly.replace(/&#34;/g, "\"")),
      statsDaily: JSON.parse(window.statsDaily.replace(/&#34;/g, "\"")),
      poiInfo: JSON.parse(window.poiInfo.replace(/&#34;/g, "\""))};

    console.log("Rendering Events Hourly Table...");
    console.log(this.state.token);
    console.log(this.state.eventsHourly);
    console.log(this.state.eventsDaily);
    console.log(this.state.statsHourly);
    console.log(this.state.statsDaily);
    console.log(this.state.poiInfo);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>EQWorks Product Development Application: UI Interface</h1>
        </header>
        <div className="App-body">
          <div className="App-tables">
            <div className="Table-div">
              <EventsHourlyTable tableData={this.state.eventsHourly}/>
            </div>
            
            <div className="Table-div">
              <EventsDailyTable tableData={this.state.eventsDaily}/>
            </div>
          </div>
          
          <div className="App-tables" style={{marginBottom: '30%'}}>
            <div className="Table-div">
              <StatsHourlyTable tableData={this.state.statsHourly}/>
            </div>

            <div className="Table-div">
              <StatsDailyTable tableData={this.state.statsDaily}/>
            </div>
          </div>

          <div className="App-map">
            <VisualMap eventsData={this.state.eventsHourly} statsData={this.state.statsHourly} poiData={this.state.poiInfo}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


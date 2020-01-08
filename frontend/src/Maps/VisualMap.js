import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Circle } from 'google-maps-react';
import './VisualMap.css';
import DateForm from './DateForm';
import RadioForm from './RadioForm';
import { createMarkerData } from './MarkerCreationHelper'

const events = 'events';
const impressions = 'impressions';
const clicks = 'clicks';
const revenue = 'revenue';

export class VisualMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventsData: this.props.eventsData,
      statsData: this.props.statsData,
      poiData: this.props.poiData,
      startDate: null,
      endDate: null,
      selectedCategory: events,
      selectedMarker: null,
      showInfoWindow: false
    };

    setCenter(this.state);
  }

  onStartChange = (value) => {
    this.setState({ startDate: value });
  }

  onEndChange = (value) => {
    this.setState({ endDate: value });
  }

  onRadioChange = (value) => {
    this.setState({ selectedCategory: value });
  }

  render() {
    var markerData = createMarkerData(this.state.selectedCategory,
      this.state.eventsData,
      this.state.statsData,
      this.state.poiData,
      this.state.startDate,
      this.state.endDate);

    console.log("markerData:", markerData);
    console.log(markerData["EQ Works"]);
    console.log(markerData["CN Tower"]);
    console.log(markerData["Niagara Falls"]);
    console.log(markerData["Vancouver Harbour"]);

    return (
      <div className='Data-map'>
        <div className='Visual-forms'>
          <DateForm onChange={this.onStartChange} boxText={'Entries After: '} />
          <DateForm onChange={this.onEndChange} boxText={'Entries Until: '} />
          <RadioForm onChange={this.onRadioChange} />
        </div>
        <Map google={this.props.google} zoom={4} initialCenter={this.state.center}>
          {
            //Marker
            Object.keys(markerData).map(markerName => (
              <Marker
                name={markerName}
                position={markerData[markerName]['position']}
                onClick={() => {
                  console.log('Clicked marker position', markerData[markerName]['position']);
                  this.setState({ selectedMarker: markerData[markerName], showInfoWindow: true });
                }} />
            ))
          }

          {
            //Infowindow
            this.state.showInfoWindow && (
              <InfoWindow position={{
                lat: this.state.selectedMarker['position']['lat'],
                lng: this.state.selectedMarker['position']['lng']
              }}
                visible={this.state.showInfoWindow}>
                <div className="Info-window">
                  <h3>Info</h3>
                  <h4>
                    Selected data category: <span className="Info-window-header">{this.state.selectedCategory}</span>
                  </h4>
                  <span>{this.state.selectedCategory}: {this.state.selectedMarker['count']}</span>
                </div>
              </InfoWindow>)
          }

        </Map>
      </div>
    );
  }
}

function setCenter(map) {
  var sum_lat = 0, sum_lon = 0;
  var i;
  for (i = 0; i < map.poiData.length; i++) {
    sum_lat += map.poiData[i].lat;
    sum_lon += map.poiData[i].lon;
  }

  map.center = {
    lat: sum_lat / i,
    lng: sum_lon / i
  };

  console.log(map.center.lat);
  console.log(map.center.lng);
}

//TODO: Remove API Key and move to env variables after migration
export default GoogleApiWrapper({
  apiKey: (process.env['GOOGLE_KEY'])
})(VisualMap)


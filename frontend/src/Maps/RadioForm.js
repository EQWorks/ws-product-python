import React, { Component } from 'react';
import './VisualMap.css';

class RadioForm extends Component{
  constructor(props){
    super(props);

    this.state = {
        selectedOption: events
    };
  }

  handleChange = (event) => {
      this.setState({selectedOption: event.target.value})
      this.handleSubmit(event.target.value);
  }

  handleSubmit = (newValue) => {
    console.log('Handle Change: ' + newValue);
    this.props.onChange(newValue);
  }

  render() {
    console.log('Current selected option: ' + this.state.selectedOption);

    return (
      <form>
            <label>
                <input
                    type="radio"
                    name="events"
                    value={events}
                    checked={this.state.selectedOption == events}
                    onChange={this.handleChange}
                />
                Events
            </label>

            <label>
                <input
                    type="radio"
                    name="impressions"
                    value={impressions}
                    checked={this.state.selectedOption == impressions}
                    onChange={this.handleChange}
                />
                Impressions
            </label>    

            <label>
                <input
                    type="radio"
                    name="clicks"
                    value={clicks}
                    checked={this.state.selectedOption == clicks}
                    onChange={this.handleChange}
                />
                Clicks
            </label>    

            <label>
                <input
                    type="radio"
                    name="revenue"
                    value={revenue}
                    checked={this.state.selectedOption == revenue}
                    onChange={this.handleChange}
                />
                Revenue
            </label>
      </form>
    );
  }
}

const events = 'events';
const impressions = 'impressions';
const clicks = 'clicks';
const revenue = 'revenue';

export default RadioForm;


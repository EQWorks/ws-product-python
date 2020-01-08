import React, { Component } from 'react';
import './VisualMap.css';

class DateForm extends Component{
  constructor(props){
    super(props);

    this.state = {
        value:'',
        boxLabel:this.props.boxText
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
    this.handleSubmit(event.target.value);
  }

  handleSubmit(newValue) {
      this.props.onChange(newValue);
  }

  render() {
    return (
      <form>
          <label className='Form-label'>{this.state.boxLabel}</label>
          <input type="text" placeholder="YYYY-MM-DD" value={this.state.value} onChange={this.handleChange}/>
      </form>
    );
  }
}

export default DateForm;


import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import './Tables.css';

class SearchForm extends Component{
  constructor(props){
    super(props);

    this.state = {
        value:''
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
      console.log("Searching: " + newValue);
      this.props.onChange(newValue);
  }

  render() {
    return (
      <div>
            <form>
                <input type="text" placeholder="Search by date here" value={this.state.value} onChange={this.handleChange}/>
            </form>
      </div>
    );
  }
}

export default SearchForm;


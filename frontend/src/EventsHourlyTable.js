import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import './Tables.css';
import SearchForm from './SearchForm';
import * as Fuse from 'fuse.js';

class EventsHourlyTable extends Component{

  constructor(props){
    super(props);
    this.state = {
        tableData: this.props.tableData,
        search: ''
    };
  }

  onChange = (value) => {
      this.setState({search: value});
      console.log("EventsHourlyTable's search value: " + value);
  }

  isSelected = (date, dateData) => {
    dateData.forEach(element => {
        if (element === date){
            console.log("Element found");
            return true;
        }
    });
    return false;
  }

  render() {
    var options = {
        shouldSort: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "date"
        ]
      };
      var fuse = new Fuse(this.state.tableData, options); // "list" is the item array
      var dateData = fuse.search(this.state.search);
      console.log('Date Data: ' + dateData);
    return (
      <div className="Data-table">
        <SearchForm onChange={this.onChange}/>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    EventsHourlyTable
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Hour</Table.HeaderCell>
                    <Table.HeaderCell>Events</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    this.state.tableData.map((dataCell, index) => (
                        <Table.Row className={(this.isSelected(dataCell.date, dateData)?"Data-row-selected":"Data-row-unselected")}>
                            <Table.Cell>{dataCell.date}</Table.Cell>
                            <Table.Cell>{dataCell.hour}</Table.Cell>
                            <Table.Cell>{dataCell.events}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>

        </Table>
      </div>
    );
  }
}

export default EventsHourlyTable;


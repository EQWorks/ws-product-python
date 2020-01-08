import React, { Component } from 'react';
import './Tables.css';
import TableTemplate from './TableTemplate';

class EventsHourlyTable extends Component{

  constructor(props){
    super(props);
    this.state = {
        tableData: this.props.tableData,
        tableName: 'Events Hourly',
        keys:['date', 'hour', 'events'],
        searchKeys:['date']
    };
  }

  render() {
      return (
        <div className="Data-table">
          <TableTemplate tableData={this.state.tableData} tableName={this.state.tableName} keys={this.state.keys} searchKeys={this.state.searchKeys}/>
        </div>
      );
    }
  }

export default EventsHourlyTable;


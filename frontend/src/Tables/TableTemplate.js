import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import './Tables.css';
import SearchForm from './SearchForm.js';
import * as Fuse from 'fuse.js';

class TableTemplate extends Component{

  constructor(props){
    super(props);
    this.state = {
        tableData: this.props.tableData,
        tableName: this.props.tableName,
        keys:this.props.keys,
        searchKeys:this.props.searchKeys,
        search: ''
    };
  }

  onChange = (value) => {
      this.setState({search: value});
  }

  isSelected = (date, dateData) => {
   var i;
    for (i = 0; i < dateData.length; i++) {
      if (dateData[i].date === date){
        console.log("Element found");
        return true;
      }
    }
    return false;
  }

  fuzzySearch = () => {
    var options = {
      shouldSort: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: this.state.searchKeys
    };
    var fuse = new Fuse(this.state.tableData, options); // "list" is the item array
    return fuse.search(this.state.search);
  }

  render() {
      var dateData = this.fuzzySearch();
      console.log('Date Data: ' + dateData);
    return (
      <div>
        <SearchForm onChange={this.onChange}/>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Table: {this.state.tableName}</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    {
                        this.state.keys.map((key) => (
                            <Table.HeaderCell>{key}</Table.HeaderCell>
                        ))
                    }
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    this.state.tableData.map((dataCell, index) => (
                        <Table.Row className={(this.isSelected(dataCell.date, dateData)?"Data-row-selected":"Data-row-unselected")}>
                            {this.state.keys.map((key) => (
                                <Table.Cell>{dataCell[key]}</Table.Cell>
                            ))}
                        </Table.Row>
                    ))
                }
            </Table.Body>

        </Table>
      </div>
    );
  }
}

export default TableTemplate;

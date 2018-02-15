import React, { Component } from "react";
import {MONTHS, DAYS, getDateArray} from "./DateHelper";
import "./App.css";

class App extends Component {
  constructor(props){
    super();
    this.state={
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };

    this.getPrevious = this.getPrevious.bind(this);
    this.getNext = this.getNext.bind(this);
  }

  // componentDidMount(){
  //   this.setState({
  //     dateArray:getDateArray(this.state.month, this.state.year),
  //   });
  // }

  getPrevious(){
    if (this.state.month > 0) {
      this.setState({
        month : this.state.month - 1,
      });
    }
    else {
      this.setState({
        month : 11,
        year : this.state.year -1
      });
    }
  }

  getNext(){
    if (this.state.month < 11) {
      this.setState({
        month : this.state.month +1,
        
      });
    }
    else {
      this.setState({
        month : 0,
        year : this.state.year + 1
      });
    }
  }

  render() {
    const rows = getDateArray(this.state.month, this.state.year).map((item, i)=>{
      const entry = item.map((element,j)=>{
        return ( 
          <td key={j}> {element} </td>
        );
      });
      return (
        <tr key={i}> {entry} </tr>
      );
    });

    return (
      <div className="container">

        <div className="row">
          <div className="col-sm">
            <p onClick={this.getPrevious}>Previous</p>
          </div>
          <div className="col-sm">
            <p>{MONTHS[this.state.month]}</p>
          </div>
          <div className="col-sm">
            <p>{this.state.year}</p>
          </div>
          <div className="col-sm">
            <p onClick={this.getNext}>Next</p>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                {
                  DAYS.map(day=>{
                    return <th key={day}>{day}</th>;
                  })
                }
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

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
      <div>
        <div className="row header">
          <div className="col">
            <p className="btn btn-primary" onClick={this.getPrevious}>     
              <i className="fa fa-angle-left"></i> Prev
            </p>
          </div>
          <div className="col month-year">
            <p>{MONTHS[this.state.month]}</p>
          </div>
          <div className="col month-year">
            <p>{this.state.year}</p>
          </div>
          <div className="col">
            <p className="btn btn-primary float-right" onClick={this.getNext}>
            Next <i className="fa fa-angle-right"></i>
            </p>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
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

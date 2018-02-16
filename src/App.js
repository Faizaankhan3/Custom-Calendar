import React, { Component } from "react";
import {MONTHS, DAYS, getDateArray} from "./DateHelper";
import "jquery";
import "bootstrap";
import "./DateBox";
import "./App.css";
import DateBox from "./DateBox";

class App extends Component {
  constructor(props){
    super();
    this.state={
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      events : [
        {
          date: 15,
          year: 2018,
          month: 2,
          title: "Happy Birthday"
        }
      ]
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
          <td key={j} data-toggle="modal" data-target="#ModalCenter" > <DateBox date={element} state={this.state}/> </td>
        );
      });
      return (
        <tr key={i}>{entry}</tr>
      );
    });

    const modal = (
      <div className="modal fade" id="ModalCenter" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLongTitle">Add Event</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input></input>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        {modal}
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
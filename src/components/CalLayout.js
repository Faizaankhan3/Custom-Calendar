import React, { Component } from "react";
import DateBox from "./DateBox";
import {DAYS,getDateArray} from "../DateHelper";

class CalLayout extends Component{
  render(){
    const rows = getDateArray(this.props.month, this.props.year).map((item, i)=>{
      const entry = item.map((element,j)=>{
        return ( 
          <td key={j}> <DateBox onClick={this.props.onCellClick} date={element} events={this.props.getEvents(element)}/> </td>
        );
      });
      return (
        <tr key={i}>{entry}</tr>
      );
    });
    return (
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
    );
  }
}

export default CalLayout;
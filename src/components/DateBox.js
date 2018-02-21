import React, { Component } from "react";

class DateBox extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.props.onClick(e,this.props.date);
  }

  render(){
    let eventList = null;
    let date = null;
    if(this.props.events.length>0){
      eventList = this.props.events.map((i,key)=>{
        return <li key={key} className="list-group-item list-group-item-css">{i.title}</li>;
      });
    }
    if(this.props.date) {
      date=(
        <div className="date-box" onClick={this.handleClick}>
          <p className="h4 text-center">{this.props.date}</p>    
          <ul className="list-group list-group-css">
            {eventList}
          </ul>
        </div>
      );
    }
    else {
      date = (
        <div> </div>
      );
    }

    return date;
  }
}

export default DateBox;
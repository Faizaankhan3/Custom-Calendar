import React, { Component } from "react";

class DateBox extends Component{

  render(){
    let eventList = null;
    if(this.props.events.length>0){
      eventList = this.props.events.map((i,key)=>{
        return <li key={key} className="list-group-item list-group-item-css">{i.title}</li>;
      });
    }

    return(
      <div>
        <p className="h4 text-center">{this.props.date}</p>    
        <ul className="list-group list-group-css">
          {eventList}
        </ul>
      </div>
    );
  }
}

export default DateBox;
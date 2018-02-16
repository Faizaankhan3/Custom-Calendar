import React, { Component } from "react";

class DateBox extends Component{
  constructor(props){
    super(props);
    this.state={
      data : this.props
    };
    console.log(this.state);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data:nextProps
    });
  }

  render(){

    const props = this.state.data;

    const events = props.state.events.filter(i=>{
      if(i.date===props.date && i.month === props.month && i.year === props.year){
        console.log(i);
        return i;
      }
    });

    return(
      <div>
        <p className="h4 text-center">{this.props.date}</p>    
        <ul className="list-group">
          <li className="list-group-item"></li>
        </ul>
      </div>
    );
  }
}

export default DateBox;
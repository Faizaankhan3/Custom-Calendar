import React, { Component } from "react";
import {MONTHS, DAYS, getDateArray} from "./DateHelper";
import DateBox from "./Components/DateBox";
import InlineEditLabel from "./Components/InlineEditLabel";
import $ from "jquery";
import "bootstrap";
import "./App.css";


class App extends Component {
  constructor(props){
    super();
    this.state={
      dateHandling : null,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      events : [
        {
          id: 1,
          date: 15,
          year: 2018,
          month: 2,
          title: "Happy Birthday"
        }
      ],
      eventIdEditing : null
    };
    this.getPrevious = this.getPrevious.bind(this);
    this.getNext = this.getNext.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

  }

  componentDidMount(){
    $("#AddEditModal").on("shown.bs.modal", function (e) {
      $("#editablelabel>div>input").focus();
    });

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

  filterEvents(date){
    const month = this.state.month;
    const year = this.state.year;
    // eslint-disable-next-line
    return this.state.events.filter(i=>{
      if(i.month===month && i.year=== year && i.date ===date ){
        return i;
      } 
    });
  }

  handleDeleteClick(e,id){
    if(id){
      this.setState({
        // eslint-disable-next-line
        events:this.state.events.filter((i)=>{
          if(i.id!==id){
            return i;
          }
        })
      });
    }
  }

  handleSaveClick(e,value,id){
    let events = this.state.events.slice();
    if(id){
      events[events.findIndex(i=>{return i.id===id;})].title=value;
      this.setState({
        events:events
      });
    }
    else{
      let maxId=0;
      events.map((i)=>{
        if(i.id>maxId){
          maxId=i.id;
        }
        return 0;
      });

      events.push({
        id: maxId+1,
        date: this.state.dateHandling,
        year: this.state.year,
        month: this.state.month,
        title: value
      });
      this.setState({
        events:events
      });

    }
  }

  handleClick(e,date){
    if(date){
      $("#AddEditModal").modal("show");
      this.setState({
        dateHandling: date,
      });
    }
  }

  render() {
    const rows = getDateArray(this.state.month, this.state.year).map((item, i)=>{
      const entry = item.map((element,j)=>{
        return ( 
          <td key={j} onClick={(e)=>{this.handleClick(e,element);}}> <DateBox date={element} events={this.filterEvents(element)}/> </td>
        );
      });
      return (
        <tr key={i}>{entry}</tr>
      );
    });

    const modal = (
      <div /*ref={(modal)=>{this.addEditModal = modal;}}*/  className="modal fade" id="AddEditModal" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLongTitle">Event for {this.state.dateHandling}-{MONTHS[this.state.month]}-{this.state.year}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.filterEvents(this.state.dateHandling).map((i, key)=>{
                return( 
                  <InlineEditLabel  
                    key={key}  value={i.title} 
                    onDelete={(e)=>this.handleDeleteClick(e,i.id)}
                    onSave ={(e,v)=>this.handleSaveClick(e,v,i.id)}
                  />);
              })}
              <InlineEditLabel
                id = "editablelabel"  
                onSave ={(e,v)=>this.handleSaveClick(e,v,null)}
                value={""}
                isEditable={true}
                focus={true}
                onDelete={()=>{/*Do Nothing*/}}
              />
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-primary" >Save</button> */}
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="calendar">
        <h1 className="heading"> Event Calendar </h1>
        {modal}
        <div className="row header">
          <div className="col">
            <p className="btn btn-primary" onClick={this.getPrevious}>     
              <i className="fa fa-angle-left"></i> Prev
            </p>
          </div>
          <div className="col month-year">
            <p>{MONTHS[this.state.month]} {this.state.year}</p>
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
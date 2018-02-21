import React, { Component } from "react";
import {MONTHS} from "./DateHelper";
import Modal from "./components/Modal";
import CalLayout from "./components/CalLayout";
import "bootstrap";
import "./App.css";

class App extends Component {
  constructor(props){
    super();
    this.state={
      modalShow: false,
      dateHandling : null,
      eventIdEditing : null,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      events : [
        {
          id: 1,
          date: 2,
          year: 2018,
          month: 2,
          title: "Holi"
        }
      ]
    };
    this.getPrevious = this.getPrevious.bind(this);
    this.getNext = this.getNext.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this);

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
    return this.state.events.filter(i=>{
      if(i.month===month && i.year=== year && i.date ===date ){
        return i;
      } 
    });
  }

  handleDeleteClick(e,id){
    if(id){
      this.setState({
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
    this.setState({
      modalShow:true,
      dateHandling: date,
    });
  }

  handleClickCloseModal(e){
    this.setState({
      modalShow:false,
    });
  }

  render() {
    return (
      <div className="calendar">
        <h1 className="heading"> Event Calendar </h1>
        <Modal 
          isVisible={this.state.modalShow} 
          onClose={this.handleClickCloseModal}
          date={this.state.dateHandling}
          month={this.state.month}
          year={this.state.year}
          events={this.filterEvents(this.state.dateHandling)}
          onSave={this.handleSaveClick}
          onDelete={this.handleDeleteClick}
        />
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
        <CalLayout
          month={this.state.month}
          year={this.state.year}
          onCellClick={this.handleClick}
          getEvents={this.filterEvents}
        />
      </div>
    );
  }
}

export default App;
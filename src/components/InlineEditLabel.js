import React, { Component } from "react";

class InlineEditLabel extends Component{
  constructor(props){
    super(props);
    this.state={
      value: this.props.value || "",
      isEditing: this.props.isEditable || false
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  

  handleDeleteClick(e){
    this.props.onDelete(e,this.props.eventId);
  }

  handleEditClick(e){
    this.setState({
      value: this.props.value,
      isEditing : true
    });
  }

  handleSaveClick(e){
    if(this.state.value.trim().length>0){
      this.setState({
        isEditing : false,
        value:""
      });
      this.props.onSave(e,this.state.value, this.props.eventId);
    }
    else{
      this.props.onDelete(e,this.props.eventId);
    }
  }

  handleChange(e){
    this.setState({value: e.target.value});
  }

  handleKeyDown(e){
    if(e.keyCode===13){
      this.handleSaveClick(e);
    }
  }


  render(){
    const label = (
      <div className="label-show">
        <p className="list-events">{this.props.value}
          <i onClick={this.handleDeleteClick} className="fa fa-trash-o fa-lg popup-action"></i>
          <i onClick={this.handleEditClick} className="fa fa-pencil fa-lg popup-action"></i>
        </p>      
      </div>);
    const edit =( 
      <div className="input-group">
        <input type="text" className="form-control form-control-sm" 
          autoFocus={true}
          placeholder="Add Event Here !!!"
          value={this.state.value} 
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleSaveClick}  
        />
      </div>);
    return(
      <div id={this.props.id}>
        {this.state.isEditing||this.props.alwaysEdit?edit:label}
      </div>
    );
  }
}

export default InlineEditLabel;
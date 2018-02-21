import React, { Component } from "react";
import InlineEditLabel from "./InlineEditLabel";
import {MONTHS} from "../DateHelper";

class Modal extends Component{
  render(){
    const isVisible = this.props.isVisible||false;
  
    return (
      <div>
        <div className={`modal fade ${isVisible?"show":""}`} style={{display:`${isVisible?"block":"none"}`}} id="AddEditModal" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ModalLongTitle">
                  Event for {this.props.date} {MONTHS[this.props.month]} {this.props.year}
                </h5>
                <button type="button" onClick={this.props.onClose} className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.events.map((i, key)=>{
                  return( 
                    <InlineEditLabel  
                      key={key}  value={i.title}
                      eventId={i.id} 
                      onDelete={this.props.onDelete}
                      onSave ={this.props.onSave}
                    />);
                })}
                <InlineEditLabel
                  id = "editablelabel"  
                  onSave ={this.props.onSave}
                  value={""}
                  isEditable={true}
                  focus={true}
                  alwaysEdit={true}
                  onDelete={()=>{/*Do Nothing*/}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
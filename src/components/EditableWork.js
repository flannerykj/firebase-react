import React, { Component } from 'react';
import WorkPreview from './WorkPreview';
import WorkForm from './WorkForm';

class EditableWork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false
    }
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }
  openForm() {
    this.setState({
      isFormOpen: true
    })
  }
  closeForm() {
    this.setState({
      isFormOpen: false
    })
  }
  render() {
    if (this.state.isFormOpen==true) {
      return(
        <WorkForm
          artists={this.props.artists}
          workId={this.props.id}
          work={this.props.work}
          onSubmit={this.props.updateWork}
          onClose={this.closeForm}/>
        )
    } else {
      return (
        <WorkPreview
          id={this.props.id}
          work={this.props.work}
          onEditClick={this.openForm}
          deleteWork={this.props.deleteWork}/>
        )
    }
  }
}

export default EditableWork;

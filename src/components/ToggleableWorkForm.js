import React, { Component } from 'react';
import WorkForm from './WorkForm';

class ToggleableWorkForm extends Component {
  render() {
    if (this.props.isOpen == true) {
      return(
        <WorkForm
          artists={this.props.artists}
          onClose={this.props.onToggle}
          onSubmit={this.props.addWork}/>
        )
    } else {
      return (<button className='button' onClick={this.props.onToggle}> Add New Work</button>)
    }
  }
}

export default ToggleableWorkForm;


import React, { Component } from 'react';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(evt) {
    this.props.onChange({
      name: evt.target.name,
      value: evt.target.value
    });
  }
  render() {
    return(
      <div className='field'>
        <label className='label'>{this.props.label}</label>
        <div className='control'>
          <input
            value={this.props.value}
            onChange={this.onChange}
            className='input'
            type={this.props.type}
            name={this.props.name}/>
        </div>
     </div>
    )
  }
}

export default InputField;

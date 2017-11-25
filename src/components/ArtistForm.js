import React, { Component } from 'react';
import InputField from './InputField';

class ArtistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        name: ''
      }
    }
    this.onInputChange = this.onInputChange.bind(this);
  }
  handleCancel = () => {
    return;
  }
  componentDidMount() {
    if (this.props.artistId) {
      this.setState({
        inputs: {
          name: this.props.artist.name,
        }
      })
    }
  }
  submitForm(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    var newWork = {
      name: this.state.inputs.name,
      date_joined: Date.now()
    }
    const id = this.props.workId;
    id?this.props.onSubmit({id: id, fields: newWork}):this.props.onSubmit(newWork);
  }
    onInputChange({name, value}) {
    var newInputs = this.state.inputs;
    newInputs[name] = value;
    this.setState({
      inputs: newInputs
    });
  }
  render() {
    const submitButton = this.props.artistId?(
      <input
        type='submit'
        value='Save'
        className='button is-primary'
      />
          ):
        (
          <input
            type='submit'
            value='Add'
            className="button is-primary"
          />
        );
    return (
      <div className='card'>
        <div className='card-content'>
            <form onSubmit={this.submitForm.bind(this)}>
              <InputField
                value={this.state.inputs.name}
                onChange={this.onInputChange}
                type='text'
                placeholder='Name'
                label='Name'
                name='name' />

              <div className="field is-grouped">
                <div className="control">
                  {submitButton}
                </div>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default ArtistForm;

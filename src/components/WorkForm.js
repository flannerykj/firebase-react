import React, { Component } from 'react';
import InputField from './InputField';
import AutoSuggest from './AutoSuggest';

class WorkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        artistName: '',
        artistId: null,
        loc: '',
        description: ''
      },
      artistOptions: []
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentDidMount() {
    this.setState({
      artistOptions: this.props.artists
    });
    const work = this.props.work;
    if (work) {
      this.setState({
        inputs: {
          artistName: work.text.artistName,
          artistId: work.text.artistId,
          loc: work.text.loc,
          description: work.text.description
        },
      })
    }
  }
  submitForm(e){
    e.preventDefault(); // <- prevent form submit from reloading the pagea
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      const profile = auth.additionalUserInfo.profile;

      var text = {
        artistId: this.state.inputs.artistId,
        artistName: this.state.inputs.artistName,
        loc: this.state.inputs.loc,
        description: this.state.inputs.description,
        timestamp: Date.now(),
        userName: profile.given_name,
        userId: auth.user.uid
      }
      this.props.workId?
      this.props.onSubmit({id: this.props.workId, text: text}):
        this.props.onSubmit(text);
    }
    else {
      alert('Must be logged in to submit a work');
    }
   this.props.onClose();
  }
  handleCancel(evt) {
    evt.preventDefault();
    this.props.onClose();
  }
  onInputChange({name, value}) {
    var newInputs = this.state.inputs;
    newInputs[name] = value;
    this.setState({
      inputs: newInputs
    });
  }
  handleSelectArtist = (artist) => {
    console.log(artist);
    var newInputs = this.state.inputs;
    newInputs.artistName = artist.artistName;
    newInputs.artistId = artist; artist.artistId;
    this.setState({
      inputs: newInputs
    });
  }

  render() {
    const submitButton = this.props.workId?(
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
            <AutoSuggest
              artistName={this.state.inputs.artistName}
              label='Artist'
              onSelect={this.handleSelectArtist}
              staticDataSource={this.props.artists.map((artist) => ({artistName: artist.text.name, artistId: artist.id}))} />
            <InputField
              value={this.state.inputs.loc}
              onChange={this.onInputChange}
              type='text'
              placeholder='Location'
              label='Location'
              name='loc' />

            <InputField
              value={this.state.inputs.description}
              onChange={this.onInputChange}
              type='text'
              placeholder='Description'
              label='Description'
              name='description' />

            <div className="field is-grouped">
              <div className="control">
                {submitButton}
              </div>
              <div className="control">
                <button onClick={this.handleCancel} className="button is-link">Cancel</button>
              </div>
            </div>
          </form>
        </div>
    </div>
    );
  }
}

export default WorkForm;

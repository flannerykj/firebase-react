import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggestResults from './AutoSuggestResults';



class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: [],
      highlightedResult: 0,
      selectedResultId: null,
      showSuggestions: false
    }
  }
  componentDidMount() {
    this.setState({
      input: this.props.artistName||''
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.artistName != this.props.artistName) {
      console.log(nextProps.artistName);
      this.setState({
        input: nextProps.artistName||''
      })
    }
    this.setState({
      results: nextProps.staticDataSource,
    });
  }
  onChange = (evt) => {
    console.log(this.state.results);
    this.setState({
      input: evt.target.value,
      showSuggestions: true});
    this.setState({
      results: this.props.staticDataSource.filter(function (el) {
        return el.artistName.indexOf(evt.target.value) !== -1
      })
    });
  }
  handleKeyUp = (e) => {
    var index = this.state.highlightedResult;
    if (e.keyCode == 40) {
      if(this.state.highlightedResult < this.state.results.length-1) {
        this.setState({
          highlightedResult: index + 1
        })
      }
    }
    if(e.keyCode==38) {
      if(this.state.highlightedResult > 0) {
        this.setState({
          highlightedResult: index - 1
        });
      }
    }

  }
  handleKeyPress = (e) => {
    var index = this.state.highlightedResult;
    if (e.charCode == 13) {
      e.preventDefault();
      console.log(this.state.results[index]);
      this.setState({
        input: this.state.results[index].artistName,
        selectedResultId: this.state.results[index].artistId,
        showSuggestions: false
      })

    this.props.onSelect(this.state.results[index]);
    }
  }
  handleOptionClick = (index, e) => {
    document.getElementById("artist-search").focus();
     this.setState({
       highlightedResult: index,
       input: this.state.results[index].artistName,
       selectedResultId: this.state.results[index].artistId,
       showSuggestions: false
     });
    const artist = this.state.results[index];
    this.props.onSelect(artist);
  }
  render() {
    const props = this.props;
    return(
      <div>
        <div className='field'>
            <label className='label'>{props.label}</label>
            <div className='control'>
              <input
                id='artist-search'
                autoComplete='off'
                onKeyPress={this.handleKeyPress}
                onKeyUp={this.handleKeyUp}
                value={this.state.input}
                onChange={this.onChange}
                autoFocus='true'
                className='input'
                type='text' />
            </div>
          </div>
          {(this.state.showSuggestions==true)?(<AutoSuggestResults
            results={this.state.results}
            handleOptionClick={this.handleOptionClick}
            highlightedResult={this.state.highlightedResult} />):
          (<span>Start searching</span>)}
        </div>
    )
  }
}

export default AutoSuggest;

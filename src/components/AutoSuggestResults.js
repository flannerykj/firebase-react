import React, { Component } from 'react';

class AutoSuggestResults extends Component {
  render() {
    return(

        <ul className='results'>
            {this.props.results.map((result, index) => {
              return (
              <li
                onClick={this.props.handleOptionClick.bind(this, index)}
                  className={(index===this.props.highlightedResult)?'selected-suggestion suggestion':'suggestion'}
                  key={index}
                  value={result.artistId}> {result.artistName}</li>
              )
              })}
          </ul>

    )
  }
}

export default AutoSuggestResults;

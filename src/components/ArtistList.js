import React, {Component} from 'react';

class ArtistList extends Component {
  render() {
    return (
      <div>
        <h1 className='title'>Artists</h1>
          { /* Render the list of artists*/
          this.props.artists.map( (artist, index) => {
          return (
            <div className='box'>
              <h3 className='title is-4'>{artist.text.name}</h3>
              <h4 className='subtitle is-6'>Date Joined: {new Date(artist.text.date_joined).toString()}</h4>
            </div>
          )
          })
          }
      </div>

    )
  }
}

export default ArtistList;

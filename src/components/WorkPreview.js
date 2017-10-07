import React, { Component } from 'react';

class WorkPreview extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.props.deleteWork(this.props.id);
  }
  render() {
    const {artistName, artistId, description, loc, featured_img} = this.props.work.text;
    var timestamp = new Date(this.props.work.text.timestamp);
    //var imagePath = '.images/'.concat(featured_img);
    return(
        <div className="card" >
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                </div>
                <div className="media-content">
                  <p className="title is-4">{artistName}</p>
                  <p className="subtitle is-6">in {loc}</p>
                </div>
              </div>

              <div className="content">
                {description}
                <br />
                <time dateTime={timestamp.toString()}>{timestamp.toString()}</time>
              </div>
            </div>
            <footer className="card-footer">
                <span onClick={this.props.onEditClick} className="card-footer-item"><a>Edit</a></span>
                <span onClick={this.handleDeleteClick} className="card-footer-item"><a>Delete</a></span>
            </footer>
          </div>


    )
  }
}

export default WorkPreview;

import React, {Component} from 'react';
import EditableWork from './EditableWork';

class WorkList extends Component {
  render() {
    return (
      <div>
        <h1 className='title'>Works</h1>
          { /* Render the list of works */
          this.props.works.map( (work, index) => {
          const timestamp = new Date(work.text.timestamp);
          return (
          <EditableWork
            artists={this.props.artists}
            work={work}
            key={index}
            id={work.id}
            updateWork={this.props.updateWork}
            deleteWork={this.props.deleteWork}
        />
          )
          })
          }
      </div>

    )
  }
}

export default WorkList;

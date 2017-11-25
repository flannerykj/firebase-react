import React, { Component } from 'react';

class ProfileInfo extends Component {
  render() {
    const p = this.props.profile;
    return(
      <section className='section'>
        <h1 className='title'>Welcome, {p.given_name}</h1>
        Email: {p.email}
      </section>
    )
  }
}

export default ProfileInfo;

import React from 'react';
import {
  Link
} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <img src='cityscape.jpg'/>
          </a>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <Link to='/' className='navbar-item'>
              <a className="navbar-item ">
               Work
            </a>
          </Link>
          <Link to='/artists' className='navbar-item'>
              <a className="navbar-item " >
              Artists
            </a>
          </Link>

        </div>
        <div className='navbar-end'>
          <a className='navbar-item' onClick={this.props.handleSignIn} >
            Sign In
          </a>
        </div>
        </div>
      </nav>
        )
    }
}

export default Header;

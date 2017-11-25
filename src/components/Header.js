import React from 'react';
import {
  Link,
  NavLink
} from 'react-router-dom';
import {Icon} from 'react-fa';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerActive: false
    }
  }
  toggleHamburger = () => {
    this.setState({
     isHamburgerActive: !this.state.isHamburgerActive,
    });
  }
  render() {
    var authPanel =
      <div className='navbar-end'>
        <a className="navbar-item " onClick={this.props.handleSignIn}>Sign In</a>
      </div>;
    if (this.props.isSignedIn) {
      authPanel =
        <div className='navbar-end'>
            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                <span className="icon">
                    <Icon name="user"/>
                </span>
                {this.props.profile.given_name}
              </a>
              <div className='navbar-dropdown is-boxed'>
                <a className='navbar-item' href='/profile'>
                  <div className='navbar-content'>

                    Profile
                  </div>
                </a>
                <a className='navbar-item' onClick={this.props.handleLogOut}>
                  <div className='navbar-content'>Logout</div>
                </a>
              </div>
            </div>
        </div>;
    }

    return (
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <img src='cityscape.jpg'/>
            </a>
            <button onClick={this.toggleHamburger} className={this.state.isHamburgerActive?"button navbar-burger is-active":"button navbar-burger"}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className={this.state.isHamburgerActive?'navbar-menu is-active':'navbar-menu'}>
            <div className='navbar-start'>
              <NavLink to='/works' className='navbar-item' activeClassName='is-active'>
                 Works
            </NavLink>
            <NavLink to='/artists' className='navbar-item' activeClassName='is-active'>
                Artists
            </NavLink>

          </div>
          <div className='navbar-end'>
            {authPanel}
            </div>
          </div>
        </div>
      </nav>
        )
    }
}

export default Header;

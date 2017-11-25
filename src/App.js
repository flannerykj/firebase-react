import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import {fire, signIn, getToken} from './fire';
import {works} from './dummyData';

import Header from './components/Header';
import ArtistForm from './components/ArtistForm';
import ToggleableWorkForm from './components/ToggleableWorkForm';
import WorkList from './components/WorkList';
import ArtistList from './components/ArtistList';
import ProfileInfo from './components/ProfileInfo';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      works: [],
      artists: [],
      isFormOpen: false
    }; // <- set up react state
    this.toggleForm = this.toggleForm.bind(this);
    this.addWork = this.addWork.bind(this);
    this.updateWork = this.updateWork.bind(this);
  }
  componentWillMount(){
    /* Create reference to works in Firebase Database */
    let worksRef = fire.database().ref('works').orderByKey().limitToLast(100);
    worksRef.on('child_added', snapshot => {
      let work = { text: snapshot.val(), id: snapshot.key };
      this.setState({ works: [work].concat(this.state.works) });
    })
    let artistsRef = fire.database().ref('artists').orderByKey().limitToLast(100);
    artistsRef.on('child_added', snapshot => {
      let artist = { text: snapshot.val(), id: snapshot.key };
      this.setState({ artists: [artist].concat(this.state.artists) });
    })
  }
  componentDidMount() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      this.setSignIn(JSON.parse(auth));
    }
  }
  toggleForm() {
    this.setState({
      isFormOpen: !this.state.isFormOpen
    });
  }
  addWork(newWork){
    fire.database().ref('works').push( newWork );
    this.toggleForm();
  }
  updateWork({id, text}) {
    var works = this.state.works.map((work) => {
      if (id==work.id) {
        return ({
          id: id,
          text: text
        })
      } else {
        return work;
      }
    });
    this.setState({works: works});
    fire.database().ref('works').child(id).update( text );
  }
  deleteWork = (id) => {
    var index = null;
    var works = this.state.works;
    for(var i=0; i<works.length; i++) {
      if (id==works[i].id) {
        index = i;
        break;
      }
    }
    works.splice(index, 1);
    this.setState({works: works});
    fire.database().ref('works').child(id).remove();
  }
  addArtist(newArtist) {
    fire.database().ref('artists').push( newArtist );
  }
  setSignIn = (info) => {
    console.log(info);
    this.setState({
      signedIn: true,
      profile: info.additionalUserInfo.profile,
      credential: info.credential
    });
    localStorage.setItem('auth', JSON.stringify(info));
  }
  handleSignIn = () => {
    signIn(this.setSignIn);
  }
  handleLogOut = () => {
    localStorage.clear();
    this.setState({
      signedIn: false,
      profile: null,
      credentials: null
    });
  }
  render() {
    return (
      <Router>
      <div className='app'>
        <Header
          handleSignIn={this.handleSignIn}
          isSignedIn={this.state.signedIn}
          profile={this.state.profile}
          handleLogOut={this.handleLogOut}/>
          <div className='container'>
            <Switch>
              <Route exact path="/" render={() =>
                  <Redirect to="/works"/>
              }/>
              <Route exact path='/works' >
                <div>
                  <section className='section'>
                    {(this.state.signedIn==true)?<ToggleableWorkForm
                      isOpen={this.state.isFormOpen}
                      artists={this.state.artists}
                      onToggle={this.toggleForm}
                      addWork={this.addWork} />:"Sign in to add a work"}
                    <br/><br/>
                    <WorkList
                      artists={this.state.artists}
                      updateWork={this.updateWork}
                      deleteWork={this.deleteWork}
                      works={this.state.works} />
                  </section>
                </div>
              </Route>
              <Route exact path='/artists'>
                <div>
                  <section className='section'>
                    <h1 className='title'>Add New Artist</h1>
                    <ArtistForm
                      onSubmit={this.addArtist}/>
                  </section>
                  <section className='section'>
                    <ArtistList artists={this.state.artists} />
                  </section>
                </div>
              </Route>
              <Route exact path="/profile">
                {(this.state.signedIn==true)?
                  <section className='section'>
                    <ProfileInfo profile={this.state.profile}/>
                  </section>:
                    <div>Sign In to view profile</div>}
              </Route>

          </Switch>
        </div>
    </div>
  </Router>
    );
  }
}

export default App;

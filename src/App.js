import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {fire, signIn, getToken} from './fire';
import {works} from './dummyData';

import Header from './components/Header';
import ArtistForm from './components/ArtistForm';
import ToggleableWorkForm from './components/ToggleableWorkForm';
import WorkList from './components/WorkList';


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
  handleSignIn = () => {
    signIn().then(
      this.setState({
        signedIn: true
      })
    );
  }
  render() {
    return (
      <Router>
      <div className='app'>
        <Header
          handleSignIn={this.handleSignIn}/>
          <div className='container'>
            <Switch>
              <Route exact path='/' >
                <div>
                  <section className='section'>
                    <ToggleableWorkForm
                      isOpen={this.state.isFormOpen}
                      artists={this.state.artists}
                      onToggle={this.toggleForm}
                      addWork={this.addWork} />
                  </section>
                  <section className='section'>
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
                    <h1>Add New Artist</h1>
                    <ArtistForm
                      onSubmit={this.addArtist}/>
                  </section>
                  <section className='section'>
                    <h1>Artists</h1>
                    <ul>
                    {this.state.artists.map((artist) => {
                    return(
                    <li key={artist.id}>{artist.text.name}</li>
                    )})}
                  </ul>
                                      </section>
                </div>
            </Route>
          </Switch>
        </div>
    </div>
  </Router>
    );
  }
}

export default App;

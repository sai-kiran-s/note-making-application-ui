import React, { useState } from 'react';
import './App.css';
import HomePage from './Home';
import CardUI from './card'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './SignIn';
import { connect } from 'react-redux'
import { loginHandler, logoutHandler } from './userReducer';
import NoteMaker from './notemaker';
import ViewNotesScreen from './viewNotesScreen';
import Appbar from './Appbar'
import SignUp from './SignUp';

function App(props) {
  const [loggedIn, setLogged] = useState(props.token ? true : false)
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route path="/transcript" >
            {!loggedIn ? <SignIn /> : <React.Fragment><Appbar /><CardUI purpose={"TRANSCRIPT A NEW AUDIO"} /></React.Fragment>}
          </Route>
          <Route path="/viewsavednotes">
            {!loggedIn ? <SignIn /> : <React.Fragment><Appbar /><ViewNotesScreen /></React.Fragment>}
          </Route>

          <Route path="/createnotes">
            {!loggedIn ? <SignIn /> : <React.Fragment><Appbar /><NoteMaker /></React.Fragment>}
          </Route>
          <Route path="/signup">
            {<SignUp/>}
          </Route>
          <Route path="/">
            {!loggedIn ? <SignIn /> : <React.Fragment><HomePage /></React.Fragment>}
          </Route>

        </Switch>
      </React.Fragment>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    token: state.token
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: () => { loginHandler() },
    logoutHandler: () => { dispatch(logoutHandler()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

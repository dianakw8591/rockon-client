import React from 'react';
import './App.css';
import NavBar from './containers/NavBar';
import Landing from './containers/Landing';
import Dashboard from './containers/Dashboard';
import Account from './containers/Account';
import Log from './containers/Log';
import { api } from './services/api';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  state = {
    signupForm: true,
    authUser: null,
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        this.setState({ authUser: user.user });
      });
    }
  }

  switchForm = () => {
    this.setState(prev => {
      return ({
        signupForm: !prev.signupForm
      })
    })
  }

  login = data => {
    localStorage.setItem("token", data.jwt);
    this.setState({ authUser: data.user });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ 
      authUser: null, 
    });
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar switchForm={this.switchForm} signupForm={this.state.signupForm} handleLogout={this.logout} authUser={this.state.authUser} />
          {/* <Route exact path='/' render={(props) => <Landing {...props} signupForm={this.state.signupForm} onLogin={this.login} />} /> */}
          <Route exact path="/">
            {this.state.authUser ? <Redirect to="/dashboard" /> : <Landing signupForm={this.state.signupForm} onLogin={this.login} />}
          </Route>
          <Route exact path='/dashboard' render={(props) => <Dashboard {...props} />} />
          <Route exact path='/account' render={(props) => <Account {...props} />} />
          <Route exact path='/logbook' render={(props) => <Log {...props} />} />
        </Router>
      </div>
    )
  }
}
export default App;

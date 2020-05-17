import React from 'react';
import './App.css';
import 'multirange/multirange.css'
import NavBar from './containers/NavBar';
import Landing from './containers/Landing';
import Dashboard from './containers/Dashboard';
import Account from './containers/Account';
import About from './components/About';
import { api, API_ROOT } from './services/api';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  state = {
    loading: true,
    signupForm: true,
    authUser: {},
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(resp => {
        if (!resp.error) {
          this.setState({ authUser: resp.user, loading: false });
        } 
      });
    } else {
      this.setState({ loading: false })
      //ping heroku to wake up the server
      fetch(API_ROOT)
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
      authUser: {},
    });
  };

  updateUser = data => {
    this.setState({
      authUser: data.user,
    })
  }

  render() {
    if (this.state.loading) {
      return <div><h2>Loading...</h2></div>
    } else {
      return (
        <div>
          <Router>
            <NavBar switchForm={this.switchForm} signupForm={this.state.signupForm} handleLogout={this.logout} authUser={this.state.authUser} />
            <Route exact path="/">
              {this.state.authUser.id ? <Redirect to="/dashboard/stats" /> : <Landing signupForm={this.state.signupForm} onLogin={this.login} />}
            </Route>
            <Route exact path='/about' component={About} />
            <Route path='/dashboard' render={(props) => <Dashboard {...props} authUser={this.state.authUser} />} />
            <Route exact path='/account' render={(props) => <Account {...props} authUser={this.state.authUser} onUpdateUser={this.updateUser} handleLogout={this.logout} />} />
          </Router>
        </div>
      )
    }
  }
}
export default App;

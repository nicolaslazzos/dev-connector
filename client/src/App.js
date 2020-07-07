import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </section>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;

import React from 'react';
// import './App.css';
import './components/style.css';
import MainPage from './pages/main';
import { Settings } from './components/Settings';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

function App() {
  return (
    <Router>
    <section className="main-container">
      <div className="container" >

        <Switch>
            <Route exact={true}  path="/" component={MainPage} />
            <Route exact={true}  path="/settings" component={Settings} />
        </Switch>
      </div>
    </section>
    </Router>
  );
}

export default App;

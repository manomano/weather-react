import React from 'react';
import './App.css';
import MainPage from './pages/main';
import { Settings } from './components/Settings';
import { BrowserRouter as Router, Route, Link, Switch  } from 'react-router-dom';


function App() {
  return (
    <Router>
    <section className="section is-small" style={{width: "20%"}} >
      <div className="container" >
        <div>
          <Link to="/settings"><button className="button is-medium">Settings</button></Link> 
        </div>
        <Switch>
            <Route path="/" component={MainPage} />
            <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </section>  
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route component={NotFound} /> */}
    </Router>
  );
};

export default App;
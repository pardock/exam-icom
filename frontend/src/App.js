import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StarWars from './components/StarWars';
import Graphic from './components/Graphic';
import Bitso from './components/Bitso';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Graphic} />
        <Route exact path="/bitso" component={Bitso} />
        <Route exact path="/star-wars" component={StarWars} />
      </Switch>
    </Router>
  );
}

export default App;

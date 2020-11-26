import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import About from './About';
import ShowDetail from './ShowDetail';
import MovieDetail from './MovieDetail';
import Navig from './Navig';

const Routes = () => {
    return (
        <BrowserRouter>
            <Navig />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
                <Route path="/shows/:id" component={ShowDetail} />
                <Route path="/movies/:id" component={MovieDetail} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

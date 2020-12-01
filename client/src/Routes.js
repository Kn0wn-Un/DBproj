import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './About';
import ShowDetail from './ShowDetail';
import MovieDetail from './MovieDetail';
import Navig from './Navig';
import Search from './Search';

const Routes = () => {
    const [isAuth, setAuth] = useState(false);
    return (
        <BrowserRouter>
            <Navig />
            <Switch>
                <Route exact path="/" component={Search} />
                <Route
                    path="/about"
                    render={(props) => (
                        <About isAuth={isAuth} handler={setAuth} {...props} />
                    )}
                />
                <Route path="/shows/:id" component={ShowDetail} />
                <Route path="/movies/:id" component={MovieDetail} />
                <Route exact path="/search" component={Search} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

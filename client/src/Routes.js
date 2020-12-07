import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './About';
import ShowDetail from './ShowDetail';
import MovieDetail from './MovieDetail';
import Navig from './Navig';
import Search from './Search';
import SignUp from './SignUp';

const Routes = () => {
    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState(-1);
    return (
        <BrowserRouter>
            <Navig />
            <Switch>
                <Route exact path="/" component={Search} />
                <Route
                    path="/about"
                    render={(props) => (
                        <About
                            isAuth={isAuth}
                            user={user}
                            handler={setAuth}
                            setUser={setUser}
                            {...props}
                        />
                    )}
                />
                <Route
                    path="/shows/:id"
                    render={(props) => (
                        <ShowDetail isAuth={isAuth} user={user} {...props} />
                    )}
                />
                <Route
                    path="/movies/:id"
                    render={(props) => (
                        <MovieDetail isAuth={isAuth} user={user} {...props} />
                    )}
                />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/search" component={Search} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

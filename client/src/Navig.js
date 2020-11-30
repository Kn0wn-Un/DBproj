import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function Navig() {
    return (
        <div className="navigation">
            <Link to="/">
                <h1>ShowFlix</h1>
            </Link>
            <div className="nav-link">
                <Link className="nav-div" to="/search">
                    Search
                </Link>
            </div>
            <div className="nav-link">
                <Link className="nav-div" to="/about">
                    User
                </Link>
            </div>
        </div>
    );
}

export default Navig;

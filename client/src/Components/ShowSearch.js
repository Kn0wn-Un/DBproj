import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function ShowSearch(props) {
    const arr = props.shows.map((show, index) => {
        return (
            <div key={show.id} className="shelf">
                <Link className="unstyle" to={`/shows/${show.id}`}>
                    <img
                        alt={show.name}
                        src={show.poster_image}
                        className="poster-small"
                    ></img>
                    <div>{show.name}</div>
                </Link>
            </div>
        );
    });
    if (arr.length > 0) return <div className="disp-search">{arr}</div>;
    else
        return (
            <div className="nores">
                oops..no results were found :( <br />
                try using different search keyword
            </div>
        );
}

export default ShowSearch;

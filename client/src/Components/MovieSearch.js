import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MovieSearch(props) {
    const arr = props.movies.map((movie) => {
        return (
            <div key={movie.id} className="shelf">
                <Link to={`/movies/${movie.id}`}>
                    <img
                        alt={movie.name}
                        className="poster-small"
                        src="https://i.pinimg.com/originals/96/a0/0d/96a00d42b0ff8f80b7cdf2926a211e47.jpg"
                    ></img>
                    <div>{movie.name}</div>
                </Link>
            </div>
        );
    });
    const srch = <div className="disp-search">{arr}</div>;
    if (arr.length > 0) return srch;
    else
        return (
            <div className="nores">
                oops..no results were found :( <br />
                try using different search keyword
            </div>
        );
}

export default MovieSearch;

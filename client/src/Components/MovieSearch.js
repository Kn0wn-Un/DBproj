import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function MovieSearch(props) {
    const arr = props.movies.map((movie) => {
        return (
            <div key={movie.id} className="shelf">
                <Link className="unstyle" to={`/movies/${movie.dbId}`}>
                    <img
                        alt={movie.original_title}
                        className="poster-small"
                        src={
                            'https://image.tmdb.org/t/p/original/' +
                            movie.poster_path
                        }
                    ></img>
                    <div>{movie.original_title}</div>
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

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function ShowSearch(props) {
    const arr = props.shows.map((show) => {
        return (
            <div key={show.id} className="shelf">
                <Link className="unstyle" to={`/shows/${show.dbId}`}>
                    <img
                        alt={show.name}
                        src={
                            'https://image.tmdb.org/t/p/original/' +
                            show.poster_path
                        }
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

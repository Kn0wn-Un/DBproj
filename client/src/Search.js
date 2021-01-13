import './styles.css';
import { useState, useEffect } from 'react';
import ShowSearch from './Components/ShowSearch';
import MovieSearch from './Components/MovieSearch';

function Search() {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showRes, setShow] = useState(false);
    useEffect(() => {
        let lastSrch = localStorage.getItem('shows');
        if (lastSrch) {
            setShows(JSON.parse(lastSrch));
            setShow(true);
        }
        lastSrch = localStorage.getItem('movies');
        if (lastSrch) {
            setMovies(JSON.parse(lastSrch));
            setShow(true);
        }
    }, []);
    useEffect(() => {
        if (shows.length > 0) setShow(true);
        localStorage.clear();
        localStorage.setItem('shows', JSON.stringify(shows));
        localStorage.setItem('movies', JSON.stringify(movies));
    }, [shows, movies]);
    const getSearch = async (e) => {
        e.preventDefault();
        if (search.trim() === '') return;
        Promise.all([
            fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=7f082a6e3dcc6c228b449d18649a5f25&query=${search}&include_adult=false`
            ),
            fetch(`/api/search/movies?name=${search}`),
        ])
            .then(function (responses) {
                // Get a JSON object from each of the responses
                return Promise.all(
                    responses.map(function (response) {
                        return response.json();
                    })
                );
            })
            .then(function (data) {
                // Log the data to the console
                // You would do something with both sets of data here
                let tmdb = data[0].results;
                let db = data[1];
                let join = [];
                for (let i = 0; i < db.length; i++) {
                    for (let j = 0; j < tmdb.length; j++) {
                        if (db[i].name === tmdb[j].original_title) {
                            let newM = tmdb[j];
                            newM.dbId = db[i].id;
                            tmdb.splice(j, 1);
                            join.push(newM);
                        }
                    }
                }
                setMovies([...join]);
            })
            .catch(function (error) {
                // if there's an error, log it
                console.log(error);
            });
        Promise.all([
            fetch(
                `https://api.themoviedb.org/3/search/tv?api_key=7f082a6e3dcc6c228b449d18649a5f25&query=${search}&include_adult=false`
            ),
            fetch(`/api/search/shows?name=${search}`),
        ])
            .then(function (responses) {
                // Get a JSON object from each of the responses
                return Promise.all(
                    responses.map(function (response) {
                        return response.json();
                    })
                );
            })
            .then(function (data) {
                // Log the data to the console
                // You would do something with both sets of data here
                let tmdb = data[0].results;
                let db = data[1];
                let join = [];
                for (let i = 0; i < db.length; i++) {
                    for (let j = 0; j < tmdb.length; j++) {
                        if (db[i].name === tmdb[j].original_name) {
                            let newS = tmdb[j];
                            newS.dbId = db[i].id;
                            tmdb.splice(j, 1);
                            join.push(newS);
                        }
                    }
                }
                setShows([...join]);
            })
            .catch(function (error) {
                // if there's an error, log it
                console.log(error);
            });
    };
    return (
        <div>
            <form onSubmit={getSearch}>
                <input
                    className="searchbox"
                    type="text"
                    placeholder="Batman"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                ></input>
                <button className="srch-btn">
                    <span className="material-icons">search</span>
                </button>
            </form>
            <div className="results">
                {showRes ? (
                    <div>
                        <div className="movies">
                            <h2>Movies:</h2> <MovieSearch movies={movies} />
                        </div>
                        <div className="shows">
                            <h2>Shows:</h2> {<ShowSearch shows={shows} />}
                        </div>
                    </div>
                ) : (
                    'Search for something..'
                )}
            </div>
        </div>
    );
}

export default Search;

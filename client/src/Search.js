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
        await fetch(`/api/search/shows?name=${search}`)
            .then((res) => res.json())
            .then((data) => {
                setShows(data);
            });
        await fetch(`/api/search/movies?name=${search}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
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
                        <div className="shows">
                            <h2>Shows:</h2> {<ShowSearch shows={shows} />}
                        </div>
                        <div className="movies">
                            <h2>Movies:</h2> <MovieSearch movies={movies} />
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

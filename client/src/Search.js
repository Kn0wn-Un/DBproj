import './styles.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Search() {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showRes, setShow] = useState(false);
    useEffect(() => {
        let lastSrch = localStorage.getItem('shows');
        if (lastSrch) setShows(JSON.parse(lastSrch));
        lastSrch = localStorage.getItem('movies');
        if (lastSrch) setMovies(JSON.parse(lastSrch));
    }, []);
    useEffect(() => {
        if (shows.length > 0) setShow(true);
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
    const dispShows = () => {
        const arr = shows.map((show) => {
            return (
                <div key={show.id}>
                    <Link to={`/shows/${show.id}`}>{show.name}</Link>
                </div>
            );
        });
        if (arr.length > 0) return arr;
        else return 'No results found';
    };
    const dispMovies = () => {
        const arr = movies.map((movie) => {
            return (
                <div key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.name}</Link>
                </div>
            );
        });
        if (arr.length > 0) return arr;
        else return 'No results found';
    };
    return (
        <div>
            <form onSubmit={getSearch}>
                <input
                    className="searchbox"
                    type="text"
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
                            <div>Shows:</div> {dispShows()}
                        </div>
                        <div className="movies">
                            <div>Movies:</div> {dispMovies()}
                        </div>
                    </div>
                ) : (
                    'No results found..'
                )}
            </div>
        </div>
    );
}

export default Search;

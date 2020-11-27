import './styles.css';
import { useEffect, useState } from 'react';

function MovieDetail({ match }) {
    const [movie, setmovie] = useState({});
    const [gotData, setGot] = useState(false);
    const [poster, setPoster] = useState('');
    const getPoster = async (id) => {
        await fetch(`http://www.omdbapi.com/?i=${id}&apikey=7b26edf7`)
            .then((res) => res.json())
            .then((data) => {
                setPoster(data.Poster);
            })
            .catch(() => {});
    };
    const showMovie = () => {
        return (
            <div className="show-details">
                <img alt={movie.name} src={poster}></img>
                <div className="holder">
                    <div className="details">
                        <h1>{movie.name}</h1>
                        <div>
                            <span className="heading">Year:</span> {movie.year}
                        </div>
                        <div>
                            <span className="heading">Genre:</span>{' '}
                            {movie.genre}
                        </div>
                        <div>
                            <span className="heading">Production Company:</span>{' '}
                            {movie.production_company}
                        </div>
                        <div>
                            <span className="heading">Duration:</span>{' '}
                            {movie.duration} mins
                        </div>
                        <div>
                            <span className="heading">Writer:</span>{' '}
                            {movie.writer}
                        </div>
                        <div>
                            <span className="heading">Director:</span>{' '}
                            {movie.director}
                        </div>
                        <div className="limit">
                            <span className="heading">Actors:</span>{' '}
                            {movie.actors}
                        </div>
                        <div className="limit">
                            <span className="heading">Summary:</span>{' '}
                            {movie.description}
                        </div>
                    </div>
                    <div className="show-form">Collect details</div>
                </div>
            </div>
        );
    };
    useEffect(() => {
        console.log('Hello World from Movie');
        console.log(match.params.id);
        fetch(`/api/movies?id=${match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setmovie(data);
                setGot(true);
            });
        return () => {
            console.log('Unmounted Movie');
        };
    }, []);
    useEffect(() => {
        console.log(movie);
        getPoster(movie.imdb_id);
    }, [gotData]);
    return (
        <div className="App">
            {gotData ? <ol>{showMovie()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default MovieDetail;

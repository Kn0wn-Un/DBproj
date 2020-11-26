import './App.css';
import { useEffect, useState } from 'react';

function MovieDetail({ match }) {
    const [movie, setmovie] = useState({});
    const [gotData, setGot] = useState(false);
    const [poster, setPoster] = useState('');
    const getPoster = async (id) => {
        const details = await fetch(
            `http://www.omdbapi.com/?i=${id}&apikey=7b26edf7`
        );
        await details.then((data) => {
            setPoster(data.Poster);
        });
        console.log(poster);
    };
    const showMovie = () => {
        return (
            <div className="show-details">
                <img alt={movie.name} src={poster}></img>
                <div className="details">
                    <h1>{movie.name}</h1>
                    <h4>Year: {movie.year}</h4>
                    <div>Genre: {movie.genre}</div>
                    <div>Production Company: {movie.production_company}</div>
                    <div>Duration: {movie.duration} mins</div>
                    <div>Writer: {movie.writer}</div>
                    <div>Director: {movie.director}</div>
                    <div>Actors: {movie.actors}</div>
                    <div>Summary: {movie.description}</div>
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
        getPoster(movie.imdb_id);
        return () => {
            console.log('Unmounted Movie');
        };
    }, []);
    useEffect(() => {
        console.log(movie);
    }, [gotData]);
    return (
        <div className="App">
            {gotData ? <ol>{showMovie()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default MovieDetail;

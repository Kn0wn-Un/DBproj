/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useEffect, useState } from 'react';
import MovieForm from './MovieForm';

function MovieDetail({ match, isAuth, user }) {
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
                <div>
                    <img alt={movie.name} src={poster}></img>
                    {isAuth ? (
                        <div className="show-form">
                            <MovieForm movie={movie} user={user} />
                        </div>
                    ) : null}
                </div>

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
                        <div className="trailer">
                            <h1>Trailer</h1>
                            <iframe
                                title={movie.name}
                                width="420"
                                height="315"
                                src="https://www.youtube.com/embed/9GVMoxhtrY8"
                            ></iframe>{' '}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    useEffect(() => {
        fetch(`/api/movies?id=${match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setmovie(data);
                setGot(true);
            });
    }, []);
    useEffect(() => {
        getPoster(movie.imdb_id);
    }, [gotData]);
    return (
        <div className="App">
            {gotData ? <ol>{showMovie()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default MovieDetail;

/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useEffect, useState } from 'react';
import MovieForm from './MovieForm';

function MovieDetail({ match, isAuth, user }) {
    const [movie, setmovie] = useState({});
    const [gotData, setGot] = useState(false);
    const [poster, setPoster] = useState('');
    const [trailer, setTrailer] = useState('');
    const [watch, setWatch] = useState(false);
    const [rent, setRent] = useState([]);
    const [ott, setOtt] = useState([]);
    const [buy, setBuy] = useState([]);
    const getPoster = async (name) => {
        await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=7f082a6e3dcc6c228b449d18649a5f25&query=${name}&page=1`
        )
            .then((res) => res.json())
            .then((data) => {
                setPoster(
                    'https://image.tmdb.org/t/p/original/' +
                        data.results[0].poster_path
                );
                console.log(data);
                return fetch(
                    `https://api.themoviedb.org/3/movie/${data.results[0].id}/videos?api_key=7f082a6e3dcc6c228b449d18649a5f25`
                );
            })
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < data.results.length; i++) {
                    if (data.results[i].type === 'Trailer')
                        setTrailer(data.results[i].key);
                }
                console.log(data);
                return fetch(
                    `https://api.themoviedb.org/3/movie/${data.id}/watch/providers?api_key=7f082a6e3dcc6c228b449d18649a5f25`
                );
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results.IN);
                console.log(data.results.IN.flatrate);
                let lData = data.results.IN;
                if (lData !== undefined) {
                    setWatch(true);
                    setBuy(
                        lData.buy.map((provider, index) => {
                            return (
                                <li key={index}>{provider.provider_name}</li>
                            );
                        })
                    );
                    setRent(
                        lData.rent.map((provider, index) => {
                            return (
                                <li key={index}>{provider.provider_name}</li>
                            );
                        })
                    );
                    setOtt(
                        lData.flatrate.map((provider, index) => {
                            return (
                                <li key={index}>{provider.provider_name}</li>
                            );
                        })
                    );
                }
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
                        {trailer !== '' ? (
                            <div className="trailer">
                                <h1>Trailer</h1>
                                <iframe
                                    title={movie.name}
                                    width="420"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${trailer}`}
                                ></iframe>{' '}
                            </div>
                        ) : null}
                        {watch ? (
                            <div className="watch">
                                <h1>Where to Watch:</h1>
                                {buy.length > 0 ? (
                                    <div>
                                        <h4 className="heading">Buy:</h4>
                                        <ul>{buy}</ul>
                                    </div>
                                ) : null}
                                {rent.length > 0 ? (
                                    <div>
                                        <h4 className="heading">Rent:</h4>
                                        <ul>{rent}</ul>
                                    </div>
                                ) : null}
                                {ott.length > 0 ? (
                                    <div>
                                        <h4 className="heading">OTT:</h4>
                                        <ul>{ott}</ul>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
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
                getPoster(data.name.replace(' ', '%20'));
            });
    }, []);
    useEffect(() => {
        //getPoster(movie.name.replace(' ', '%20'));
    }, [gotData]);
    return (
        <div className="App">
            {gotData ? <ol>{showMovie()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default MovieDetail;

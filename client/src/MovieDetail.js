/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useEffect, useState } from 'react';
import MovieForm from './MovieForm';

function MovieDetail({ match, isAuth, user }) {
    const [movie, setmovie] = useState({});
    const [gotData, setGot] = useState(false);
    const [trailer, setTrailer] = useState('');
    const [watch, setWatch] = useState(false);
    const [rent, setRent] = useState([]);
    const [ott, setOtt] = useState([]);
    const [buy, setBuy] = useState([]);
    const [actors, setActors] = useState([]);
    const [director, setDirector] = useState([]);
    const [writer, setWriter] = useState([]);
    const getDetails = async (name) => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=7f082a6e3dcc6c228b449d18649a5f25&query=${name}&page=1`
        )
            .then((res) => res.json())
            .then((data) => {
                let id = data.results[0].id;
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=7f082a6e3dcc6c228b449d18649a5f25&language=en-US`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status_code) return;
                        setmovie(data);
                        setGot(true);
                    });
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7f082a6e3dcc6c228b449d18649a5f25`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        for (let i = 0; i < data.results.length; i++) {
                            if (data.results[i].type === 'Trailer')
                                setTrailer(data.results[i].key);
                        }
                    });
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7f082a6e3dcc6c228b449d18649a5f25&language=en-US`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        setActors(
                            data.cast.filter(
                                (p, index) =>
                                    p.known_for_department === 'Acting' &&
                                    index < 11
                            )
                        );
                        setDirector(
                            data.crew.filter(
                                (p) => p.known_for_department === 'Directing'
                            )
                        );
                        setWriter(
                            data.crew.filter(
                                (p) => p.known_for_department === 'Writing'
                            )
                        );
                    });
                fetch(
                    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=7f082a6e3dcc6c228b449d18649a5f25`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        let lData = data.results.IN;
                        if (!lData) return;
                        if (lData.flatrate) {
                            setOtt(
                                lData.flatrate.map((provider, index) => {
                                    return (
                                        <li key={index}>
                                            {provider.provider_name}
                                        </li>
                                    );
                                })
                            );
                        }
                        if (lData.buy) {
                            setBuy(
                                lData.buy.map((provider, index) => {
                                    return (
                                        <li key={index}>
                                            {provider.provider_name}
                                        </li>
                                    );
                                })
                            );
                        }
                        if (lData.rent) {
                            setRent(
                                lData.rent.map((provider, index) => {
                                    return (
                                        <li key={index}>
                                            {provider.provider_name}
                                        </li>
                                    );
                                })
                            );
                        }
                        setWatch(true);
                    });
            });
    };
    const showMovie = () => {
        return (
            <div className="show-details">
                <div>
                    <img
                        alt={movie.original_title}
                        src={
                            'https://image.tmdb.org/t/p/original/' +
                            movie.poster_path
                        }
                    ></img>
                    {isAuth ? (
                        <div className="show-form">
                            <MovieForm id={match.params.id} user={user} />
                        </div>
                    ) : null}
                </div>

                <div className="holder">
                    <div className="details">
                        <h1>{movie.original_title}</h1>
                        <div>
                            <span className="heading">Release Date:</span>{' '}
                            {movie.release_date}
                        </div>
                        <div>
                            <span className="heading">Runtime:</span>{' '}
                            {movie.runtime} mins
                        </div>
                        <div>
                            <span className="heading">Genre:</span>{' '}
                            {movie.genres.map((g) => g.name).join(', ')}
                        </div>
                        <div>
                            <span className="heading">Production Company:</span>{' '}
                            {movie.production_companies
                                .map((p) => p.name)
                                .join(', ')}
                        </div>
                        <div>
                            <span className="heading">Writers:</span>{' '}
                            {writer.map((g) => g.name).join(', ')}
                        </div>
                        <div>
                            <span className="heading">Directors:</span>{' '}
                            {director.map((g) => g.name).join(', ')}
                        </div>
                        <div className="limit">
                            <span className="heading">Cast:</span>{' '}
                            {actors.map((g) => g.name).join(', ')}
                        </div>
                        <div className="limit">
                            <span className="heading">Summary:</span>{' '}
                            {movie.overview}
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
                getDetails(data.name);
                return;
            });
    }, []);
    return (
        <div className="App">
            {gotData ? <ol>{showMovie()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default MovieDetail;

/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useEffect, useState } from 'react';
import ShowForm from './ShowForm';

function ShowDetail({ match, isAuth, user }) {
    const [show, setShow] = useState({});
    const [gotData, setGot] = useState(false);
    const [trailer, setTrailer] = useState('');
    const [watch, setWatch] = useState(false);
    const [rent, setRent] = useState([]);
    const [ott, setOtt] = useState([]);
    const [buy, setBuy] = useState([]);
    const getInfo = async (name) => {
        fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=7f082a6e3dcc6c228b449d18649a5f25&query=${name}&page=1`
        )
            .then((res) => res.json())
            .then((data) => {
                let id = data.results[0].id;
                fetch(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=7f082a6e3dcc6c228b449d18649a5f25&language=en-US`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status_code) return;
                        setShow(data);
                        setGot(true);
                    });
                fetch(
                    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=7f082a6e3dcc6c228b449d18649a5f25`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        for (let i = 0; i < data.results.length; i++) {
                            if (data.results[i].type === 'Trailer')
                                setTrailer(data.results[i].key);
                        }
                    });
                fetch(
                    `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=7f082a6e3dcc6c228b449d18649a5f25`
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
    const mkSeasons = () => {
        // eslint-disable-next-line no-eval
        const sArr = eval(show.seasons).map((season, index) => {
            return (
                <li key={index}>
                    <span className="heading">Season {index + 1}: </span>
                    <span>{season.episode_count} episodes</span>
                </li>
            );
        });
        return sArr;
    };
    const viewShow = () => {
        return (
            <div className="show-details">
                <div>
                    <img
                        alt={show.name}
                        src={
                            'https://image.tmdb.org/t/p/original/' +
                            show.poster_path
                        }
                    ></img>
                    {isAuth ? (
                        <div className="show-form">
                            <ShowForm id={match.params.id} user={user} />
                        </div>
                    ) : null}
                </div>

                <div className="holder">
                    <div className="details">
                        <h1 className="name">{show.original_name}</h1>
                        <div>
                            <span className="heading">First Air Date: </span>{' '}
                            {show.first_air_date}
                        </div>
                        <div>
                            <span className="heading">Created By:</span>{' '}
                            {show.created_by.map((c) => c.name).join(', ')}
                        </div>
                        <div>
                            <span className="heading">Network: </span>
                            {show.networks.map((n) => n.name).join(', ')}
                        </div>
                        <div>
                            <span className="heading">Genre:</span>{' '}
                            {show.genres.map((g) => g.name).join(', ')}
                        </div>
                        <div>
                            <span className="heading">Number of Seasons: </span>{' '}
                            {show.number_of_seasons}
                        </div>
                        <ul>{mkSeasons()}</ul>
                        <div>
                            <span className="heading">Average Duration: </span>{' '}
                            {show.episode_run_time[0]} mins
                        </div>
                        {trailer !== '' ? (
                            <div className="trailer">
                                <h1>Trailer</h1>
                                <iframe
                                    title={show.name}
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
        fetch(`/api/shows?id=${match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                getInfo(data.name);
            });
    }, []);
    return (
        <div className="App">
            {gotData ? <ol>{viewShow()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default ShowDetail;

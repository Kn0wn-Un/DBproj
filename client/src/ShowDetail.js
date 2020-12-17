/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useEffect, useState } from 'react';
import ShowForm from './ShowForm';

function ShowDetail({ match, isAuth, user }) {
    const [name, setName] = useState({});
    const [gotData, setGot] = useState(false);
    const [info, setInfo] = useState({});
    const [trailer, setTrailer] = useState('');
    const [watch, setWatch] = useState(false);
    const [rent, setRent] = useState([]);
    const [flatRate, setFlatRate] = useState([]);
    const [buy, setBuy] = useState([]);
    const getInfo = async (name) => {
        await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=7f082a6e3dcc6c228b449d18649a5f25&query=${name}&page=1`
        )
            .then((res) => res.json())
            .then((data) => {
                setInfo(
                    'https://image.tmdb.org/t/p/original/' +
                        data.results[0].poster_path
                );
                console.log(data);
                return fetch(
                    `https://api.themoviedb.org/3/tv/${data.results[0].id}/videos?api_key=7f082a6e3dcc6c228b449d18649a5f25`
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
                    `https://api.themoviedb.org/3/tv/${data.id}/watch/providers?api_key=7f082a6e3dcc6c228b449d18649a5f25`
                );
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results.IN);
                let lData = data.results.IN;
                if (lData.flatrate) {
                    setFlatRate(
                        lData.flatrate.map((provider, index) => {
                            console.log(data.results.IN.flatrate);
                            return (
                                <li key={index}>{provider.provider_name}</li>
                            );
                        })
                    );
                }
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
                }
            })
            .catch(() => {});
    };
    const mkSeasons = () => {
        // eslint-disable-next-line no-eval
        const sArr = eval(name.seasons).map((season, index) => {
            return (
                <li key={index}>
                    <span className="heading">Season {index + 1}: </span>
                    <span>{season.nb_episodes} episodes</span>
                </li>
            );
        });
        return sArr;
    };
    const viewShow = () => {
        return (
            <div className="show-details">
                <div>
                    <img alt={name.name} src={name.poster_image}></img>
                    {isAuth ? (
                        <div className="show-form">
                            <ShowForm show={name} user={user} />
                        </div>
                    ) : null}
                </div>

                <div className="holder">
                    <div className="details">
                        <h1 className="name">{name.name}</h1>
                        <div>
                            <span className="heading">Network: </span>
                            {name.network}
                        </div>
                        <div>
                            <span className="heading">Number of Seasons: </span>{' '}
                            {name.number_of_seasons}
                        </div>
                        <ul>{mkSeasons()}</ul>
                        <div>
                            <span className="heading">Average Duration: </span>{' '}
                            {name.runtime} mins
                        </div>
                        {trailer !== '' ? (
                            <div className="trailer">
                                <h1>Trailer</h1>
                                <iframe
                                    title={name.name}
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
                                {flatRate.length > 0 ? (
                                    <div>
                                        <h4 className="heading">OTT:</h4>
                                        <ul>{flatRate}</ul>
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
                setName(data);
                setGot(true);
                getInfo(data.name.replace(' ', '%20'));
            });
    }, []);
    return (
        <div className="App">
            {gotData ? <ol>{viewShow()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default ShowDetail;

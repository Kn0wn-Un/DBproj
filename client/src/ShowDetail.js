/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { useEffect, useState } from 'react';
import ShowForm from './ShowForm';

function ShowDetail({ match, isAuth, user }) {
    const [name, setName] = useState({});
    const [gotData, setGot] = useState(false);
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
                        <div className="trailer">
                            <h1>Trailer</h1>
                            <iframe
                                title={name.name}
                                width="420"
                                height="315"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                            ></iframe>{' '}
                        </div>
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
            });
    }, []);
    return (
        <div className="App">
            {gotData ? <ol>{viewShow()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default ShowDetail;

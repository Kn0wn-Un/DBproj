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
                <img alt={name.name} src={name.poster_image}></img>
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
                    </div>
                    {isAuth ? (
                        <div className="show-form">
                            <ShowForm show={name} user={user} />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    };
    useEffect(() => {
        console.log('Hello World Show Detail');
        console.log(match.params.id);
        console.log(user);
        fetch(`/api/shows?id=${match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data);
                setGot(true);
            });
        return () => {
            console.log('Unmounted Show Detail');
        };
    }, []);
    useEffect(() => {
        console.log(name);
    }, [gotData]);
    return (
        <div className="App">
            {gotData ? <ol>{viewShow()}</ol> : 'loading'}{' '}
        </div>
    );
}

export default ShowDetail;

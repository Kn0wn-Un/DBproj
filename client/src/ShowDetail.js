import './App.css';
import { useEffect, useState } from 'react';

function ShowDetail({ match }) {
    const [name, setName] = useState({});
    const [gotData, setGot] = useState(false);
    const mkSeasons = () => {
        const sArr = eval(name.seasons).map((season, index) => {
            return (
                <li key={index}>
                    <div>Season {index + 1}</div>
                    <div>Episodes: {season.nb_episodes}</div>
                </li>
            );
        });
        return sArr;
    };
    const mkArr = () => {
        return (
            <div className="show-details">
                <img alt={name.name} src={name.poster_image}></img>
                <div className="details">
                    <h1>{name.name}</h1>
                    <h4>Network: {name.network}</h4>
                    <div>Number of Seasons: {name.number_of_seasons}</div>
                    <div></div>
                    <ul>{mkSeasons()}</ul>
                    <br />
                    <div>Average Duration: {name.runtime} mins</div>
                </div>
            </div>
        );
    };
    useEffect(() => {
        console.log('Hello World from Name');
        console.log(match.params.id);
        fetch(`/api/shows?id=${match.params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data);
                setGot(true);
            });
        return () => {
            console.log('Unmounted Name');
        };
    }, []);
    useEffect(() => {
        console.log(name);
    }, [gotData]);
    return (
        <div className="App">{gotData ? <ol>{mkArr()}</ol> : 'loading'} </div>
    );
}

export default ShowDetail;

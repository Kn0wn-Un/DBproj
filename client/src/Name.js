import './App.css';
import { useEffect, useState } from 'react';

function Name() {
    const [name, setName] = useState([]);
    const [gotData, setGot] = useState(false);
    const mkArr = () => {
        return (
            <div>
                <img alt={name[0].name} src={name[0].poster_image}></img>
                <h1>{name[0].name}</h1>
                <h4>{name[0].network}</h4>
            </div>
        );
    };
    useEffect(() => {
        console.log('Hello World from Name');
        fetch('/shop')
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

export default Name;

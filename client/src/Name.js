import './App.css';
import { useEffect, useState } from 'react';

function Name() {
    const [name, setName] = useState([]);
    const [gotData, setGot] = useState(false);
    const mkArr = () => {
        const nameArr = name.map((row) => {
            return <li key={row.id}>{row.name}</li>;
        });
        return nameArr;
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

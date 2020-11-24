import './App.css';
import { useEffect, useState } from 'react';

function Name() {
    const [name, setName] = useState('');
    useEffect(() => {
        console.log('Hello World from Name');
        fetch('/shop')
            .then((res) => res.json())
            .then((data) => setName(data.name));
        return () => {
            console.log('Unmounted Name');
        };
    }, []);
    return <div className="App">Name: {name}</div>;
}

export default Name;

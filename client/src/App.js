import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [name, setName] = useState('');
    useEffect(() => {
        fetch('/shop')
            .then((res) => res.json())
            .then((data) => setName(data.name));
    }, []);
    console.log(name);
    return (
        <div className="App">
            Learn React
            <div>Name: {name}</div>
        </div>
    );
}

export default App;

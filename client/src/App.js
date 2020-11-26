import './App.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        console.log('Hello World from App');
        fetch('/api/search')
            .then((res) => res.json())
            .then((data) => {
                setRows(data);
            });
        return () => {
            console.log('Unmounted App');
        };
    }, []);
    return (
        <div className="App">
            {rows.length === 0
                ? 'loading...'
                : rows.map((row) => {
                      return (
                          <div key={row.id}>
                              <Link to={`/shows/${row.id}`}>{row.name}</Link>
                          </div>
                      );
                  })}
            <br />
            <Link to={`/movies/${20000}`}>Movie!</Link>
        </div>
    );
}

export default App;

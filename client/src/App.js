import './App.css';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <br />
            <Link to="/about">about</Link>
            <br />
            <Link to="/name">Gravity Falls</Link>
        </div>
    );
}

export default App;

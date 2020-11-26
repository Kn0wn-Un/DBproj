import './App.css';
import { useEffect } from 'react';
function About() {
    useEffect(() => {
        console.log('Hello World from About');
        return () => {
            console.log('Unmounted About');
        };
    }, []);
    return <div className="App">About User</div>;
}

export default About;

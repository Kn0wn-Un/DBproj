import './styles.css';
import UserSummary from './Components/UserSummary';
import UserTable from './Components/UserTable';
import Login from './Login';
import { useEffect, useState } from 'react';
function About(props) {
    const [toShow, setShow] = useState('shows');
    const [loggedIn, setLogin] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        setLogin(props.isAuth);
    }, [props.isAuth]);
    useEffect(() => {
        console.log(data);
    }, [data]);
    useEffect(() => {
        if (loggedIn) getData();
    }, [loggedIn]);
    const logOut = () => {
        setLogin(false);
        props.handler(false);
    };
    const getData = async () => {
        await fetch(`/api/users?userId=${props.user}`)
            .then((res) => res.json())
            .then((info) => {
                setData(info);
            });
    };
    const data1 = {
        movie: [
            { name: 'Movie1' },
            { name: 'Movie2' },
            { name: 'Movie3' },
            { name: 'Movie4' },
            { name: 'Movie5' },
        ],
        show: [
            { name: 'show1' },
            { name: 'show2' },
            { name: 'show3' },
            { name: 'show4' },
        ],
        watchLater: [
            { name: 'Watch Later' },
            { name: 'Watch Later' },
            { name: 'Watch Later' },
            { name: 'Watch Later' },
        ],
    };
    return (
        <div>
            {loggedIn ? (
                <div>
                    <button className="btn btn-primary logout" onClick={logOut}>
                        Logout
                    </button>
                    {data.length !== 0 ? (
                        <UserSummary data={data} />
                    ) : (
                        <div>Loading..</div>
                    )}
                    <div className="user-nav">
                        <div className="nav-head bg-dark">
                            <div
                                className="select"
                                onClick={() => {
                                    setShow('shows');
                                }}
                            >
                                Shows
                            </div>
                            <div
                                className="select"
                                onClick={() => {
                                    setShow('movies');
                                }}
                            >
                                Movies
                            </div>
                            <div
                                className="select"
                                onClick={() => {
                                    setShow('movies');
                                }}
                            >
                                Watch Later
                            </div>
                        </div>
                    </div>
                    {data.length !== 0 ? (
                        <UserTable list={data} show={toShow} />
                    ) : (
                        <div>Loading..</div>
                    )}
                </div>
            ) : (
                <div>
                    <Login logged={props.handler} setUser={props.setUser} />
                </div>
            )}
        </div>
    );
}

export default About;

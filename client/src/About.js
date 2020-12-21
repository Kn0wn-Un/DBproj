/* eslint-disable react-hooks/exhaustive-deps */
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
        if (loggedIn) getData();
    }, [loggedIn]);
    const logOut = () => {
        setLogin(false);
        props.handler(false);
    };
    const deleteAcc = async () => {
        await fetch(`/api/users/delete?userId=${props.user}`)
            .then((res) => res.json())
            .then((isDel) => {
                if (isDel) logOut();
            });
    };
    const getData = async () => {
        await fetch(`/api/users?userId=${props.user}`)
            .then((res) => res.json())
            .then((info) => {
                setData(info);
            });
    };
    return (
        <div>
            {loggedIn ? (
                <div>
                    <div>
                        <button
                            className="btn btn-primary logout"
                            onClick={logOut}
                        >
                            Logout
                        </button>
                        <button
                            className="btn btn-primary delete"
                            onClick={deleteAcc}
                        >
                            Delete
                        </button>
                    </div>

                    {data.length !== 0 ? (
                        <UserSummary data={data} />
                    ) : (
                        <div>Loading..</div>
                    )}
                    <div className="user-nav">
                        <div className="nav-head bg-dark">
                            <div
                                className="select"
                                tabIndex="1"
                                onClick={(e) => {
                                    setShow('shows');
                                }}
                            >
                                Shows
                            </div>
                            <div
                                className="select"
                                tabIndex="1"
                                onClick={() => {
                                    setShow('movies');
                                }}
                            >
                                Movies
                            </div>
                            <div
                                className="select"
                                tabIndex="1"
                                onClick={() => {
                                    setShow('wlMovies');
                                }}
                            >
                                Watch Later Movies
                            </div>
                            <div
                                className="select"
                                tabIndex="1"
                                onClick={() => {
                                    setShow('wlShows');
                                }}
                            >
                                Watch Later Shows
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

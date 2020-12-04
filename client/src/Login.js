import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const logInUser = async (e) => {
        e.preventDefault();
        await fetch(`/api/users/login?name=${name}&pass=${pass}`)
            .then((res) => res.json())
            .then((auth) => {
                if (auth) {
                    props.logged(true);
                    console.log('user found!');
                } else console.log('user does not exists');
            });
    };
    return (
        <div>
            <form onSubmit={logInUser}>
                <label>Username</label>
                <br />
                <input
                    type="text"
                    placeholder="username"
                    value={name}
                    required
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                ></input>
                <br />
                <label>Password</label>
                <br />
                <input
                    type="text"
                    placeholder="password"
                    value={pass}
                    required
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                ></input>
                <br />
                <button>Login</button>
            </form>
            <div>
                Don't have an Account?
                <Link to={`/signup`}>Create new Account</Link>
            </div>
        </div>
    );
}

export default Login;

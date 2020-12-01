import React, { useState } from 'react';

function Login(props) {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                props.logged(true);
            }}
        >
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
    );
}

export default Login;

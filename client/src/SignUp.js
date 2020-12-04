import React, { useState } from 'react';

function SignUp() {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const addNewUser = async () => {
        await fetch(`/api/users/add?name=${name}&pass=${pass}`)
            .then((res) => res.json())
            .then((data) => {
                if (data === 'err')
                    alert('User already exists cannot create new user');
                else console.log(data);
            });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addNewUser();
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
                    setPass(e.target.value.trim());
                }}
            ></input>
            <br />
            <button>Create Account</button>
        </form>
    );
}

export default SignUp;

import React, { useState } from 'react';

function SignUp(props) {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShow] = useState(false);

    const addNewUser = async () => {
        await fetch(`/api/users/add?name=${name}&pass=${pass}`)
            .then((res) => res.json())
            .then((data) => {
                if (data === 'err')
                    alert('User already exists cannot create new user');
                else {
                    alert('account created! You can now login');
                    props.history.push('/about');
                }
            });
    };

    return (
        <div className="user-form">
            <h1>Sign Up:</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addNewUser();
                }}
            >
                <label>Enter Username</label>
                <br />
                <input
                    type="text"
                    placeholder="eg: dukeravi3"
                    value={name}
                    required
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                ></input>
                <br />
                <br />
                <label>Create a Password</label>
                <br />
                {showPass ? (
                    <input
                        type="text"
                        placeholder="password"
                        value={pass}
                        required
                        onChange={(e) => {
                            setPass(e.target.value.trim());
                        }}
                    ></input>
                ) : (
                    <input
                        type="password"
                        placeholder="password"
                        value={pass}
                        required
                        onChange={(e) => {
                            setPass(e.target.value.trim());
                        }}
                    ></input>
                )}
                <span
                    onClick={() => {
                        setShow(!showPass);
                    }}
                >
                    {showPass ? (
                        <svg
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 16 16"
                            className="bi bi-eye-fill"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                                fillRule="evenodd"
                                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 16 16"
                            class="bi bi-eye-slash-fill"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z" />
                            <path
                                fillRule="evenodd"
                                d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"
                            />
                        </svg>
                    )}
                </span>
                <br />
                <br />
                <button className="btn btn-primary">Create new account</button>
            </form>
        </div>
    );
}

export default SignUp;

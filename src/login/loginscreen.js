import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function LoginScreen({isLoggedIn, loginHandler}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleFormChange (event) {
        console.log("Handle change ");

        if (event.target.name === "username") {
            setUsername(event.target.value)
        }
        if (event.target.name === "password") {
            setPassword(event.target.value)
        }
    }

    function onSubmit (event) {
        event.preventDefault();

        loginHandler(username, password);

        setUsername('');
        setPassword('');
    }

    if (isLoggedIn === true) {
        return <Redirect to="/patients/list"/>
    }

    const result = (
        <div>
        <form onSubmit={onSubmit}>
            <h1>Login</h1>

            <div className="col-md-6 form-line">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={username}
                    onChange={handleFormChange}/>
                    <span className="errors" name="forename.errors"></span>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password}
                    onChange={handleFormChange}/>
                    <span className="errors" name="surname.errors"></span>
                </div>

                <div className="form-group">

                    <Link to="/patients/list"><button>Cancel</button></Link>
                    <button type="submit">Login</button>
                </div>
            </div>
        </form>
        </div>
    );
    return result;
}

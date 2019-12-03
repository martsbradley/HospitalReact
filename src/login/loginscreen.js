import React from 'react'
import Poster from '../network'
import { Link } from 'react-router-dom'
import {Navigation} from '../navigation'

export class LoginScreen extends React.Component {

    constructor (props) {
        super(props)
        console.log("LoginScreen ");

        this.auth = props.auth;
        console.log("LoginScreen has the auth " +this.auth);
        this.state = { error: false,
                       user: { username: '',
                               password:  ''}
        };

        this.handleFormChange = this.handleFormChange.bind(this)
        this.loginURL = this.loginURL.bind(this)

        this.signInWithUserPassword= this.signInWithUserPassword.bind(this)

        this.poster = new Poster(this.successfulPost,
                                 this.showErrorMessage ,
                                 this.showErrorMessage);
    }

    successfulPost = () => {
        this.auth.loginSuccess();
    }

    showErrorMessage = () => {
        this.auth.loginfailure()
    }

    loginURL() {
        return '/auth/verifyuser';
    }

    handleFormChange (event) {
        let user = this.state.user
        console.log("Handle change ");

        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    signInWithUserPassword (event) {
        event.preventDefault();

        console.log("-->signInWithUserPassword  "+ Object.keys(this.props));

        let payload = {...this.state.user};

        this.poster.postData(this.loginURL(), payload);
    }

    render () {
        const error = this.state.error
        if (error) {
            return <p>There was an error calling the service</p>
        }

        const result = (
            <div>
            <Navigation auth={this.props.auth} onLoginscreen={true}/> 
            <form onSubmit={this.signInWithUserPassword}>

                <h1> Who are you</h1>
                <div className="col-md-6 form-line">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={this.state.user.username}
                        onChange={this.handleFormChange}/>
                        <span className="errors" name="forename.errors"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={this.state.user.password}
                        onChange={this.handleFormChange}/>
                        <span className="errors" name="surname.errors"></span>
                    </div>

                    <div className="form-group">
                        <button type="submit">Submit</button>

                        <Link to="/patients/list"><button>Cancel</button></Link>
                    </div>
                </div>
            </form>
            </div>
        );
        return result;
    }
}

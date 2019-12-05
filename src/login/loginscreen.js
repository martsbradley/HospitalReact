import React from 'react'
import Poster from '../network'
import { Link,Redirect } from 'react-router-dom'
import {Navigation} from '../navigation'

export class LoginScreen extends React.Component {

    constructor (props) {
        super(props)
        console.log("LoginScreen ");

        this.auth = props.auth;
        console.log("LoginScreen has the auth " +this.auth);
        this.state = { error: false,
                       logginPassed: false,
                       logginFailed: false,
                       user: { username: '',
                               password:  ''}
        };

        this.handleFormChange = this.handleFormChange.bind(this)
        this.loginURL = this.loginURL.bind(this)

        this.onSubmit= this.onSubmit.bind(this)

        this.poster = new Poster(this.successfulPost,
                                 this.showErrorMessage ,
                                 this.showErrorMessage);
    }

    successfulPost = () => {
        console.log("setting loginPassed as true")
        this.setState({logginPassed: true});
    }

    showErrorMessage = () => {
        console.log("setting loginFailed as true")
        this.setState({logginFailed: true});
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

    onSubmit (event) {
        console.log("here in onSubmit");
        event.preventDefault();

        console.log("-->onSubmit  "+ Object.keys(this.props));

        let payload = {...this.state.user};

        this.poster.postData(this.loginURL(), payload);
    }

    render () {
        const error = this.state.error
        if (error) {
            return <p>There was an error calling the service</p>
        }
                       
        if (this.state.logginFailed === true) {
            return <Redirect to="/loginfailure"/>
        }

        if (this.state.logginPassed === true) {
            return <Redirect to="/patients/list"/>
        }
        const result = (

            <div>
            <Navigation auth={this.props.auth} onLoginscreen={true}/> 
            <form onSubmit={this.onSubmit}>

                <h1>Please Login</h1>
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

                        <Link to="/patients/list"><button>Cancel</button></Link>
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
            </div>
        );
        return result;
    }
}

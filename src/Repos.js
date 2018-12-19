import React from 'react'
import { Link } from 'react-router-dom'
import  Logout from './logout.js'

export default class Repos extends React.Component {
    constructor (props) {
        super(props)

        this.state = { error: false,
                       userName : '',
        }

        this.loadDetails = this.loadDetails.bind(this)
        this.userLoggedOff = this.userLoggedOff.bind(this)
    }

    userLoggedOff() {
        console.log("userLoggedOff");
        this.setState({ userName: "", })
    }

    loadDetails () {
        let url = '/firstcup/rest/hospital/userDetail';

        console.log('loadDetails');
        fetch(url)
            .then(response => {
                console.log("Got back");
                console.log(response);
                if (response.ok) {
                    return response.text()
                } else {
                    this.setState({ error: true })
                    throw Error(response.statusText)
                }
            },
                networkError => {
                    console.log('Network Failure ' + networkError)
                }
            )
            .then( userName => {
                console.log('Received ' + userName);

                this.setState({ userName: userName, })
            }
            )
            .catch(exn => {
                console.log('forget about it: ' + exn.statusText)
            })
    }

    componentDidMount () {
        this.loadDetails();
    }

    render () {

        console.log("Rendering and " + this.state.userName);
        let welcome = <div>Please Log in.</div>;
        if (this.state.userName !== '') {
            welcome = <div>Welcome: {this.state.userName}</div>;
        }

      return (<div>
          {welcome}
          <ol>
              <li>
                  <Link to="/patients/list"><button>Patients</button></Link>
              </li>
              <li>
                  <Link to="/about"><button>Medicine</button></Link>
              </li>
          </ol>
          <ol>
              <li>Authentication</li>
              <li>Locking so that folks cannot write over each others changes.</li>
              <li>Add prescription and finish that out.</li>
              <li>Change it to use redux library.</li>
              <li>Fix the styling in both browsers.</li>
              <li>Learn about reactive for mobile.</li>
              <li>Setting up a TLS certificate.</li>
          </ol>
          <Logout username={this.state.userName} loggedOff={this.userLoggedOff}/>
        </div>);
    }
}

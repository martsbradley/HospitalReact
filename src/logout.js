import React from 'react'
import { Link } from 'react-router-dom'

export default class Logout extends React.Component {
    constructor (props) {
        super(props)
        this.state = {userName: this.props.userName};

        this.onClick = this.onClick.bind(this);
        this.passBad = this.passBad.bind(this);
    }


    passBad() {
        let url = '/firstcup/rest/hospital/userDetail';

        console.log('calling logOff');
        fetch(url, {
            headers: {
                'Accept': '*/*',
                'Authorization':'ZnVjazphZmY=',// Provide the server invalid credientials.
            },
        })
            .then(response => {
                console.log("Got back");
                console.log(response);
            },
                networkError => {
                    console.log('Network Failure ' + networkError)
                }
            )
            .catch(exn => {
                console.log('logoff error : ' + exn.statusText)
            })
    }




    onClick() {
        let url = '/firstcup/rest/hospital/logOff';

        console.log('calling logOff');
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/text',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("")
        })
            .then(response => {
                console.log("Got back");
                console.log(response);
              //if (response.ok) {
              //    return response.text()
              //} else {
              //    throw Error(response.statusText)
              //}
              this.passBad();
              return response;
            },
                networkError => {
                    console.log('Network Failure ' + networkError)
                }
            )
            .then( details => {
                this.props.loggedOff();
                console.log('logoff Received ' + details);
            }
            )
            .catch(exn => {
                console.log('logoff error : ' + exn.statusText)
            })
    }

    render () { 
        let result = 
                <div>
                    <Link to='/' onClick={this.onClick}><button>Log Out</button></Link>
                </div>;

        if (this.state.userName === '') {
            result = <div></div>;
        }

        return result;
    }
}

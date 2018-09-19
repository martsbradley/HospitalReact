import React from 'react';

export default class Patient extends React.Component {
    constructor(props) {
        super(props);
        console.log("here...");

        this.state = {error : false, 
                      patientId : props.match.params.gistId,
                      forename: "",
                      surname: "",
                      dob: "",
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.createPageUrl = this.createPageUrl.bind(this);
        this.loadPatient = this.loadPatient.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createPageUrl(aActivePage) {
        const patientId = this.state.patientId;
        console.log("createPageUrl is " + patientId);
        let result =`/firstcup/rest/hospital/patient/${patientId}`;
        console.log(result);
        return result;
    }

    handlePageChange(aActivePage) {
        console.log("Changing active page to " + aActivePage);

        this.loadPatient(aActivePage);
    }

    loadPatient(aActivePage) {
        console.log("aActivePage ... " + this.state.patientId);
        let url = this.createPageUrl(this.state.patientId);
        console.log("url is " + url);

        fetch(url)
        .then(res => res.json())
        .then(
                        
          (result) => { console.log(result); 
                        this.setState({forename: result.forename,
                                       surname: result.surname,
                                       dob: result.dob});},

          (error)  => { this.setState( { error : true});
                        console.log(error.toString());
                        console.log(error);
                      } 
        );
    }

    componentDidMount() {
       this.loadPatient(this.state.patientId);
    }

    handleChange(event) {
        console.log("handleChange name " + event.target.name);
        console.log("handleChange value " + event.target.value);
        this.setState({forename: event.target.value});
    }

    render() {
        const error = this.state.error;
        if (error)
        {
            return <p>There was an error calling the service</p>;
        }
        const result = (<div>
            <div><label>forename</label><input onChange={this.handleChange} value={this.state.forename} type="text" name="forename" /></div>
            <div><label>surname</label><input onChange={this.handleChange} value={this.state.surname} type="text" name="surname" /></div>
            <div><label>dob</label><input onChange={this.handleChange} value={this.state.dob} type="text" name="dob" /></div>
            </div>);
        return result;
    }
}

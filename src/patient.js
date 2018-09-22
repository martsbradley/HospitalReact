import React from 'react';
import LinkButton from './linkbutton';

function Prescription(props) { 
    const prescriptions = props.list;

    let detail = <tr></tr>;

    if (prescriptions) {
        console.log("prescriptions is a         " + typeof  prescriptions);

        detail = prescriptions.map( p => 
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.medicine.name}</td>
                <td>{p.medicine.manufacturer}</td>
                <td>{p.amount}</td>
            </tr>);
    }

    const table = (<table className='table table-bordered'>
                      <thead className='thead-dark'>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                          <tbody>{detail}</tbody></table>);

    return table;
}

export default class Patient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {error : false, 
                      patientId : props.match.params.gistId,
                      loaded: false,
                      patient: {forename: '',
                                surname: '',
                                dob: '',
                                prescription: [],
                      }
        };

        this.createPageUrl = this.createPageUrl.bind(this);
        this.loadPatient = this.loadPatient.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createPageUrl(aActivePage) {
        const patientId = this.state.patientId;
        //console.log("createPageUrl is " + patientId);
        let result =`/firstcup/rest/hospital/patient/${patientId}`;
        console.log(result);
        return result;
    }

    loadPatient(aActivePage) {
        let url = this.createPageUrl(this.state.patientId);
       //console.log("aActivePage ... " + this.state.patientId);
       //console.log("url is " + url);

        fetch(url)
        .then(res => res.json())
        .then(
          (patient) => { 
                         console.log("Received from net");
                         console.log(JSON.stringify(patient)); 
                         this.setState({patient: patient,
                                        loaded: true});
                         
                       },
          (error)   => { this.setState( { error : true});
                         console.log(error.toString());
                       } 
        );
    }

    componentDidMount() {
       this.loadPatient(this.state.patientId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.loaded;//Only render when the thing is loaded.
    }

    handleChange(event) {
        console.log("handleChange name " + event.target.name);
        console.log("handleChange value " + event.target.value);
        this.setState({forename: event.target.value});
    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        const error = this.state.error;
        if (error)
        {
            return <p>There was an error calling the service</p>;
        }
        const patient = this.state.patient;
        const pres = patient.prescription;

        console.log("pres is a " + typeof pres);

        const result = (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div><label htmlFor="forename">Forename</label><input onChange={this.handleChange} value={patient.forename} type="text" name="forename" /></div>
                    <div><label htmlFor="surname">Surname</label><input onChange={this.handleChange} value={patient.surname} type="text" name="surname" /></div>
                    <div><label htmlFor="dob" >Date of Birth</label><input onChange={this.handleChange} value={patient.dob} type="text" name="dob" /></div>
                    <div>
                        <Prescription list={pres} />
                    </div>
                    <p>
                        <LinkButton to="/patients">Cancel</LinkButton>
                        <button type="submit" >Submit</button>
                    </p>
                </form>
            </div>);
        return result;
    }
}

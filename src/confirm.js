import React from 'react'
import BackButton from './backbutton.js'

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);

        console.log("Prescription constructor " + this.props.match);
    }

    render () {
        return (<div>
            <h1>Confirm</h1>

              <BackButton text="Previous" {...this.props}/>
        </div>);
    }
}

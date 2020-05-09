import React  from 'react'

export class HomePage extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {
        // eslint-disable-next-line no-undef
        const value = SECRET;
        return (
        <div>
            <h1>Overview {value} of the website</h1>
            <p>
            This site was created to allow me to try out some modern
            technologies such as:
            </p>
            <ul>
                <li>Bal       ls.</li>
                <li>Postgres.</li>
                <li>NodeJS.</li>
                <li>React.</li>
                <li>Docker.</li>
                <li>AWS.</li>
                <li>Postgresql.</li>
                <li>Rest.</li>
                <li>Wildfly (JBoss).</li>
                <li>Auth0 Authentication.</li>
                <li>LetsEncrypt.</li>
            </ul>
            <button className="noselect" type="button" disabled={true}>Disabled Button</button><br/>
            <button type="button" disabled={false}>Enabled Button</button>

            <p>
            This site stores phony patients details, no real details are included.

            New patient records can be created and patients can be given
            prescriptions.
            </p>

            <p> Authorized users can make updates.</p>

            ** This site stores cookies.  If you do not agree to this please navigate away from this site. **
        </div>);
        }
    }

    HomePage.propTypes = {
}

import React from 'react'
import { Link } from 'react-router-dom'

export default class Repos extends React.Component {
  render () {
    return (<div>
        <ol>
            <li>
                <Link to="/patients/list"><button>Patients</button></Link>
            </li>
            <li>
                <Link to="/about"><button>Medicine</button></Link>
            </li>
        </ol>
      </div>);
  }
}

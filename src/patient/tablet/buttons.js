import React from 'react'
import { Link } from 'react-router-dom'

export default function Buttons() {
    return ( <div className="form-line">
        <div className="form-group">
            <Link to={`"here"`}><button>Cancel</button></Link>
            <button type="submit">Next</button>
        </div>
    </div>);
}

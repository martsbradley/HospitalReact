import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

// Each page should return a function
// that tells whether it is done or not?...
//

export default function Buttons({history, selectedMedId, path}) 
{
    const onDoitok  = () => {
        console.log(`Why was this clicked ${path}`);

        if (path.endsWith('/tablet') &&
            selectedMedId !== -1) {
            history.push("/patients/list");
        }
    }
    const nextDisabled = selectedMedId === -1;



    return ( <div className="form-line">
        <div className="form-group">
            <Link to={`"here"`}><button>Cancel</button></Link>
            <button disabled={nextDisabled} type="input" onClick={onDoitok} >Next</button>
        </div>
    </div>);
}

Buttons.propTypes = {
    history       : PropTypes.object,
    selectedMedId : PropTypes.number,
    path          : PropTypes.string,
}

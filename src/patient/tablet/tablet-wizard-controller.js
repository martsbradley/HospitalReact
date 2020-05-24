import React from 'react'
import PropTypes from 'prop-types';

export const ButtonInfo = (label, isDisabled, target) => {
    const b = { label      : label,
                isDisabled : isDisabled,
                target     : target};
    return b;
}

export const MyButtons = ({buttons}) => {
    const res = buttons.map(
        b => 
        { 
            //console.log(`${b.label} = ${b.isDisabled}`);

            return (
                 <button key={b.label} disabled={b.isDisabled} onClick={b.target}>
                    {b.label}
                </button>
            );
        }
    );

     return <div className="form-line">
                 <div className="form-group">
                    {res}
                 </div>
            </div>; 
}

MyButtons.propTypes = {
    buttons: PropTypes.array,
    //editPatientId : PropTypes: number
};

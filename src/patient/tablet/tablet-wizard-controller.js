import React from 'react'
import PropTypes from 'prop-types';

const ButtonInfo = (label, isDisabled, target) => {
    const b = { label      : label,
                isDisabled : isDisabled,
                target     : target};
    return b;
}

const TabletWizardController = ({page, selectedMedId, path, history}) => {

    console.log(`history is ${history}`);
    const toPatientsPage = () => history.push("/patients/list");
    const select    = () => history.push(`${path}/select`);
    const startDate = () => history.push(`${path}/startDate`);
    const endDate   = () => history.push(`${path}/endDate`);

    const buttons = [];

    if (page === 'select') {

        let c = ButtonInfo('Back', false, toPatientsPage);
        buttons.push(c);
        let b = ButtonInfo('Next', false, startDate);
        buttons.push(b);

        if (selectedMedId === -1) {
            console.log(`make ${b.label} false`);
            b.isDisabled = true;
        }
    }
    else if (page === 'startDate') {
        let c = ButtonInfo('Back', false, select);
        buttons.push(c);
        let b = ButtonInfo('Next', false, endDate);
        buttons.push(b);
    }
    else if (page === 'endDate') {
        let c = ButtonInfo('Bakk', false, startDate);
        buttons.push(c);
        let b = ButtonInfo('Next', false, endDate);
        buttons.push(b);
    }

    const res = buttons.map(
        b => 
        { 
            console.log(`${b.label} = ${b.isDisabled}`);
            return (
            <button key={b.label} disabled={b.isDisabled} type="input" onClick={b.target}>
                {b.label}
            </button>
            );
        }
    );


    return (<div className="form-line">
                 <div className="form-group">
                    {res}
                </div>
            </div>); 
}

TabletWizardController.propTypes = {
    page          : PropTypes.string,
    selectedMedId : PropTypes.number,
    path          : PropTypes.string,
    history       : PropTypes.object,
}
export default TabletWizardController;

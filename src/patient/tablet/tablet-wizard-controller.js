//import React,{useEffect, useState} from 'react'
import React from 'react'
import PropTypes from 'prop-types';
import {matchPath} from 'react-router-dom'

const ButtonInfo = (label, isDisabled, target) => {
    const b = { label      : label,
                isDisabled : isDisabled,
                target     : target};
    return b;
}

const TabletWizardController = (props) => {
    const {selectedMedId/*,startDate, endDate*/} =  props;

    const toPatientsPage = () => props.history.push("/patients/list");
    const goSelect       = () => props.history.push(`${props.match.path}/select`);
    const goStartDate    = () => props.history.push(`${props.match.path}/startDate`);
    const goEndDate      = () => props.history.push(`${props.match.path}/endDate`);


    // Now have which sub page is active currently in result.
    const subPages = ['select','startDate','endDate'];
    const page = subPages.find(subPage => 
                         matchPath(props.location.pathname, 
                                   { path: `${props.match.path}/${subPage}`}) !== null);

  //console.log(`Subpage is ${page} ${selectedMedId} ${startDate} ${endDate}`);

  //console.log(`pathname = ${props.location.pathname}`);
  //console.log(`path = ${props.match.path}`);

    const buttons = [];

    if (page === 'select') {

        let c = ButtonInfo('Back', false, toPatientsPage);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goStartDate);
        buttons.push(b);

        if (selectedMedId === -1) {
            //console.log(`make ${b.label} false`);
            b.isDisabled = true;
        }
    }
    else if (page === 'startDate') {
        let c = ButtonInfo('Back', false, goSelect);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goEndDate);
        buttons.push(b);
    }
    else if (page === 'endDate') {
        let c = ButtonInfo('Bakk', false, goStartDate);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goEndDate);
        buttons.push(b);
    }



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

    return (<div className="form-line">
                 <div className="form-group">
                    {res}
                 </div>
            </div>); 
}

TabletWizardController.propTypes = {
    selectedMedId : PropTypes.number,
    startDate     : PropTypes.string,
    endDate       : PropTypes.string,
    history       : PropTypes.object,
    location      : PropTypes.shape({
                      pathname: PropTypes.string
                  }),
    match       : PropTypes.object
}
export default TabletWizardController;

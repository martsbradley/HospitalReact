import React from 'react'
import PropTypes from 'prop-types';
import {matchPath} from 'react-router-dom'

const ButtonInfo = (label, isDisabled, target) => {
    const b = { label      : label,
                isDisabled : isDisabled,
                target     : target};
    return b;
}

export const MyButtons = (buttons) => {
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


const subPages = ['select','startDate','endDate'];
const whichSubPage = (props, subPages) => 
    subPages.find(subPage => 
                         matchPath(props.location.pathname, 
                                   { path: `${props.match.path}/${subPage}`}) !== null);
const TabletWizardController = (props) => {
    const {selectedMedId} =  props;

  //const toPatientsPage = () => props.history.push("/patients/list");
  //const goSelect       = () => props.history.push(`${props.match.path}/select`);
  //const goStartDate    = () => props.history.push(`${props.match.path}/startDate`);
  //const goEndDate      = () => props.history.push(`${props.match.path}/endDate`);
  const exitWizard = () => props.history.push("/patients/list");
  const goPage1    = () => props.history.push(`${props.match.path}/select`);
  const goPage2    = () => props.history.push(`${props.match.path}/startDate`);
  const goPage3    = () => props.history.push(`${props.match.path}/endDate`);

    const page = whichSubPage(props, subPages);

 /* console.log(`Subpage is ${page} ${selectedMedId} ${startDate} ${endDate}`);
  * console.log(`pathname = ${props.location.pathname}`);
  * console.log(`path = ${props.match.path}`);
  */

    const buttons = [];

    if (page === 'select') {

        let c = ButtonInfo('Back', false, exitWizard);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goPage2);
        buttons.push(b);

        if (selectedMedId === -1) {
            //console.log(`make ${b.label} false`);
            b.isDisabled = true;
        }
    }
    else if (page === 'startDate') {
        let c = ButtonInfo('Back', false, goPage1);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goPage3);
        buttons.push(b);
    }
    else if (page === 'endDate') {
        let c = ButtonInfo('Bakk', false, goPage2);
        buttons.push(c);
        let b = ButtonInfo('Next', false, goPage3);
        buttons.push(b);
    }

    return MyButtons(buttons);
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

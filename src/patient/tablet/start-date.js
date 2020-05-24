import React from 'react'
import ValidationMessage from '../../validationmessage.js'
import PropTypes from 'prop-types';

export const pageIds = {
    START_PAGE  : 1,
    END_PAGE    : 2,
    CONFIRM_PAGE: 3
};

function createDateField(isWritable, fieldName, value,onChangeHandler){
    let element = null;
    if (!isWritable) {
        element = <div className="form-group">
                      <label htmlFor="{fieldName}" >{fieldName}</label>
                       <input type="date" className="form-control " name={fieldName}
                                      value={value} readOnly disabled>
                      </input>
                  </div>;
    }
    else {
        element = <div className="form-group">
                      <label htmlFor="{fieldName}" >{fieldName}</label>
                      <input type="date" className="form-control" name={fieldName}
                                          value={value}  
                                          onChange={onChangeHandler}>
                       </input>
                  </div>;
    }

    return element;
}


export default function StartDate({medicineName, 
                                   startDate,
                                   endDate,
                                   handleFormChange, 
                                   pageType,
                                   validationMsg}) {
    let isBlocking = false;
    if (validationMsg !== '') isBlocking = true;

    const dateChanged = (event) => handleFormChange(event.target.value);
    let startDateBlock = createDateField(pageType === pageIds.START_PAGE, 'starpage', startDate, dateChanged);
    let endDateBlock   = null;

    if (pageType > pageIds.START_PAGE) {
        endDateBlock   = createDateField(pageType == pageIds.END_PAGE, 'endspage', endDate, dateChanged);
    }

    return (<div>
            <h1>New Prescription</h1>
            <div className="col-md-6 form-line">
               <div className="form-group">
                   <label htmlFor="medicine">Medicine</label>
                   <input type="input" className="form-control" name="medicine" 
                          readOnly disabled value={medicineName} />
               </div>
               
               {startDateBlock}

               {endDateBlock}
               
               <div className="col-md-6">
                     <ValidationMessage when={isBlocking} what={validationMsg}/>
               </div>
            </div>
        </div>);
}

StartDate.propTypes = {
    medicineName     : PropTypes.string,
    aDate            : PropTypes.string,
    handleFormChange : PropTypes.func,
    pageType         : PropTypes.number,
    startDate        : PropTypes.string,
    endDate          : PropTypes.string,
    validationMsg    : PropTypes.string,
}
//  1 Start Date
//  2 Start date (ro) End Date
//  3 Start date (ro) End Date (ro) Confirm

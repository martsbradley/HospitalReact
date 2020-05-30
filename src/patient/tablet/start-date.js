import React from 'react'
import ValidationMessage from '../../validationmessage.js'
import PropTypes from 'prop-types';
//import {useParams} from 'react-router-dom'

export const pageIds = {
    START_PAGE  : 1,
    END_PAGE    : 2,
    CONFIRM_PAGE: 3
};

function createDateField(isWritable, fieldName, value,onChangeHandler, labelTxt){
    let element = null;
    if (!isWritable) {
        element = <div className="form-group row">
                      <label className="col-sm-2 col-form-label">{labelTxt}</label>
                       <div className="col-sm-10">
                          <span className="form-control disableInput">{value}</span>
                       </div>
                  </div>;
    }
    else {
        element = <div className="form-group row">
                      <label htmlFor="{fieldName}" className="col-sm-2 col-form-label">{labelTxt}</label>
                       <div className="col-sm-10">
                           <input type="date" className="form-control" name={fieldName}
                                              value={value}  
                                              onChange={onChangeHandler}/>
                       </div>
                  </div>;
    }

    return element;
}


export default function StartDate({title,
                                   medicineName,
                                   startDate,
                                   endDate,
                                   handleFormChange, 
                                   pageType,
                                   validationMsg}) {
    let isBlocking = false;
    if (validationMsg !== '') isBlocking = true;

    const dateChanged = (event) => handleFormChange(event.target.value);
    let startDateBlock = createDateField(pageType === pageIds.START_PAGE, 'starpage', startDate, dateChanged, "Start Date");
    let endDateBlock   = null;

    if (pageType > pageIds.START_PAGE) {
        endDateBlock   = createDateField(pageType == pageIds.END_PAGE, 'endspage', endDate, dateChanged, "End Date");
    }
  //let { patientId } = useParams()
  //console.log(`patient id is ${patientId} startDate`);

    return (<div>
            <h1>Prescription {title}</h1>
            <div className="col-md-6">
               <div className="form-group row">
                   <label htmlFor="medicine" className="col-sm-2 col-form-label">Medicine</label>
                   <div className="col-sm-10">
                       <span className="form-control disableInput">{medicineName}</span>
                   </div>
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
    title            : PropTypes.string,
    medicineName     : PropTypes.string,
    aDate            : PropTypes.string,
    handleFormChange : PropTypes.func,
    pageType         : PropTypes.number,
    startDate        : PropTypes.string,
    endDate          : PropTypes.string,
    validationMsg    : PropTypes.string,
}

//import React,{useEffect} from 'react'
import React,{useEffect} from 'react'
//import React from 'react'
import PropTypes from 'prop-types';
import Medicine from '../../medicine.js'
import Pagination from 'react-js-pagination'
import ValidationMessage from '../../validationmessage.js'

export default function TabletSelect({medicines,
                                      activePage,
                                      itemsPerPage,
                                      totalItemsCount,
                                      filter,
                                      filterChanged,
                                      pageChanged,
                                      medicineClicked,
                                      selectedMedId}) 
{
    const fixme = () =>{};

    const filterEvent = (event) =>{
        console.log("Event>>");
        console.log(event.target);
        
        filterChanged(event.target.value);

    };
    useEffect(() => {
        //setWizardPage("page1");
    },[]);

    let filterElement = <input type="text" style={{display: 'inline'}} 
                               name="filter" value={filter}
                               onChange={filterEvent} />

  //if (filter === '') {

  //    filterElement = <input type="text" style={{display: 'inline'}} 
  //                           name="filter" value={filter}
  //                           placeholder="filter by name" 
  //                           onChange={filterEvent} />
  //}

    return  (

    <>
        <h1>Prescription Select Medicine {filter}</h1>
        <form onSubmit={fixme}>
            <div className="col-md-6">
                <div className="form-line">
                    <div style={{display:'inline'}}>
                        <label htmlFor="filter">Filter:</label>
                        {filterElement}
                    </div>
                    <div className="bordered">
                        <Pagination itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={itemsPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={pageChanged} 
                                    innerClass="pagination pages" />

                        <Medicine meds={medicines} 
                                selectedMedicine={selectedMedId} 
                                mouseClicked={medicineClicked} />
                    </div>
                </div>
                <div style={{clear: 'right'}} className="form-line">
                    <ValidationMessage when={false} what="Please select a medicine"/>
                </div>
            </div>

        </form>
    </>);

}

TabletSelect.propTypes = {
    medicines        : PropTypes.array,
    activePage       : PropTypes.number,
    itemsPerPage     : PropTypes.number,
    totalItemsCount  : PropTypes.number,
    filter           : PropTypes.string,
    filterChanged    : PropTypes.func,
    pageChanged      : PropTypes.func,
    medicineClicked  : PropTypes.func,
    selectedMedId    : PropTypes.number,
}

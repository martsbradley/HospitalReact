import React,{useEffect/*,useState*/} from 'react'
import PropTypes from 'prop-types';
import Medicine from '../../medicine.js'
import Pagination from 'react-js-pagination'
import ValidationMessage from '../../validationmessage.js'
//import {useParams} from 'react-router-dom'

export default function TabletSelect({selectedMedId,
                                      medicineSelected,
                                      medicines,
                                      activePage,
                                      itemsPerPage,
                                      totalItemsCount,
                                      filter,
                                      pageChanged}) 
{
    useEffect(() => {
       pageChanged(activePage, itemsPerPage, filter);
    }, []);

    function filterChanged(event) {
        pageChanged(activePage, itemsPerPage, event.target.value);
    }

    const pagingHelper = (activePage) => 
                  pageChanged(activePage, itemsPerPage, filter);

    function medicineSelectedEvent(idOfselectedRow) {
        const med = medicines.find(e => e.id === idOfselectedRow);

        let name = '';
        if (med !== null) {
            name = med.name;
        }

        medicineSelected({id: idOfselectedRow, name});
    }

  //let { patientId } = useParams()
  //console.log(`patient id is ${patientId} tabletSelect`);

    return  (
    <>
        <h1>Prescription Select Medicine</h1>
        <form>
            <div className="col-md-6">
                <div className="form-line">
                    <div style={{display:'inline'}}>
                        <label htmlFor="filterbox">Filter:</label>
                        <input type="text" key="myfilter" style={{display: 'inline'}} 
                               id="filterbox" name="filter" value={filter}
                               onChange={filterChanged} />

                    </div>
                    <div className="bordered">
                        <Pagination itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={itemsPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={pagingHelper} 
                                    innerClass="pagination pages" />

                        <Medicine meds={medicines} 
                                selectedMedicine={selectedMedId} 
                                mouseClicked={medicineSelectedEvent} />
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
    selectedMedId    : PropTypes.number,
    medicineSelected : PropTypes.func,
    medicines        : PropTypes.array,
    activePage       : PropTypes.number,
    itemsPerPage     : PropTypes.number,
    totalItemsCount  : PropTypes.number,
    filter           : PropTypes.string,
    pageChanged      : PropTypes.func,
}

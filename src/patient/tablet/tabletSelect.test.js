import React from 'react';
import TabletSelect from './tabletSelect';
import {render, fireEvent} /*screen*/ from '@testing-library/react'

import {
  getByLabelText,
  getByText,
//    getByTestId,
//    queryByTestId,
//    // Tip: all queries are also exposed on an object
//    // called "queries" which you could import here as well
//    waitFor,
} from '@testing-library/dom'

const doesNothing = () => {}

describe('TabletSelect', () => {

  //const filter = "abc";

  //const totalItemsCount=20;
    const med1 = { id: 1,
                   name: 'one',
                   manufacturer: 'oneman',
                   deliveryMethod: 'mouth'};
    const med2 = { id: 2,
                   name: 'two',
                   manufacturer: 'twoman',
                   deliveryMethod: 'injection'};
    const medArray = [med1, med2]

    const loadMedicines = (a,b) => {console.log(`loading ${a} ${b}`);}

    const defaultArgs= {filter: "abc",
                        totalItemsCount: 20,
                        meds: medArray,
                        loadMedicines: loadMedicines,
                        filterChanged: doesNothing,
                        pageChanged:   doesNothing,
                        medicineClicked:   doesNothing};

    // This makes it easier to construct the mounted object.
    function myRender(args = defaultArgs) {

       const {filter, totalItemsCount, 
              meds, loadMedicines, filterChanged,
              medicineClicked} = args;

       const {container} = render (<TabletSelect medicines={meds}
                                                 totalItemsCount={totalItemsCount}
                                                 filter={filter} 
                                                 loadMedicines={loadMedicines}
                                                 filterChanged={filterChanged} 
                                                 pageChanged={doesNothing}
                                                 medicineClicked={medicineClicked}/>);
        return container;
    }

    it('Pos: filter on change', (done) => {

        const filterChanged = (value) => {
            expect(value).toBe('Morphine');
            done();
        }

        const container = myRender({...defaultArgs, filterChanged});

        const filterTextBox = getByLabelText(container,'Filter:');
        fireEvent.change(filterTextBox, { target: { value: 'Morphine' } })
    });

    it('Pos: selected medicine', (done) => {

        const clickHandler  = jest.fn()
        clickHandler.mockImplementationOnce(() => {})
        clickHandler.mockImplementationOnce(() => {done();});

        const args = {...defaultArgs,
                      medicineClicked: clickHandler};

        const container = myRender(args);

        const rowOne = getByText(container,'oneman').closest("tr");
        const rowTwo = getByText(container,'twoman').closest("tr");

        fireEvent.click(rowOne);
        fireEvent.click(rowTwo);

        expect(clickHandler.mock.calls[0][0]).toBe(1);
        expect(clickHandler.mock.calls[1][0]).toBe(2);
    })
})

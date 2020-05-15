import React from 'react';
import {withRouter} from "react-router";
import TabletWizard from './index';
import {screen, fireEvent}  from '@testing-library/react'
import renderWithRouterMatch from '../../test-util';

import {
    waitFor,
//    getByText,
  //getByLabelText,
//    getByTestId,
//    queryByTestId,
//    // Tip: all queries are also exposed on an object
//    // called "queries" which you could import here as well
} from '@testing-library/dom'

const doesNothing = () => {}

describe('TabletWizard', () => {

  //const setState = jest.fn();
  //const useStateSpy = jest.spyOn(React, 'useState')
  //useStateSpy.mockImplementation((init) => [init, setState]);
  
  //afterEach(() => {
  //  jest.clearAllMocks();
  //});

    const med1 = { id: 1,
                   name: 'one',
                   manufacturer: 'oneman',
                   deliveryMethod: 'mouth'};
    const med2 = { id: 2,
                   name: 'two',
                   manufacturer: 'twoman',
                   deliveryMethod: 'injection'};
    const meds = [med1, med2]

    const defaultArgs = {loadMedicines:  doesNothing,
                         medicines:      meds,
                         activePage:     1,
                         itemsPerPage:   1,
                         match:          {path: '/tablets'},
                         totalItemsCount:1};

    const View = (args) =>{
        const LocationDisplay = withRouter(({ location, match }) => (
              <div data-testid="location-display">
                <TabletWizard {...args} location={location} match={match}/>;
              </div>
            ))
        return LocationDisplay;
    }

    it('Pos: loadMedicines action called', (/*done*/) => {

        const loadMedicines = jest.fn();
        const activePage = 3;
        const itemsPerPage = 10;

        const args = {...defaultArgs, loadMedicines, activePage, itemsPerPage};

        renderWithRouterMatch(View(args),
                              { path:  "/any",
                                route: "/any/select"});

        screen.getByRole('heading')
        expect(loadMedicines).toHaveBeenCalledTimes(1);
        expect(loadMedicines.mock.calls[0][0]).toBe(activePage);
        expect(loadMedicines.mock.calls[0][1]).toBe(itemsPerPage);
    })

    it('Pos: selected medicine hightlighted', /*async*/ () => {
                                                            
        const loadMedicines = jest.fn();
        const activePage = 3;
        const itemsPerPage = 10;

        const args = {...defaultArgs, loadMedicines, activePage, itemsPerPage};

        renderWithRouterMatch(View(args),
                              { path:  "/any",
                                route: "/any/select"});
                                                                 

        const rowOne = screen.getByText('oneman').closest("tr");
        fireEvent.click(rowOne);

        //await waitFor(() => expect(rowOne).toHaveClass('selected'));
    })
});

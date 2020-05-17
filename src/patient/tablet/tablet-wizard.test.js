import React from 'react';
import {withRouter} from "react-router";
import TabletWizard from './index';
import {screen, fireEvent}  from '@testing-library/react'
import renderWithRouterMatch from '../../test-util';
import {waitFor} from '@testing-library/dom'
import {med1,morphine} from './tabletSelect.test'
const doesNothing = () => {}

describe('TabletWizard', () => {
    const meds = [med1, morphine]

    const defaultArgs = {medicinesPaged:  doesNothing,
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

        const medicinesPaged = jest.fn();
        const activePage = 3;
        const itemsPerPage = 10;

        const args = {...defaultArgs, medicinesPaged, activePage, itemsPerPage};

        renderWithRouterMatch(View(args),
                              { path:  "/any",
                                route: "/any/select"});

        screen.getByRole('heading')
        expect(medicinesPaged).toHaveBeenCalledTimes(1);
        expect(medicinesPaged.mock.calls[0][0]).toBe(activePage);
        expect(medicinesPaged.mock.calls[0][1]).toBe(itemsPerPage);
    })

//  it('Pos: selected medicine hightlighted', async () => {
//                                                          
//      const medicinesPaged= jest.fn();
//      const activePage = 3;
//      const itemsPerPage = 10;

//      const args = {...defaultArgs, medicinesPaged, activePage, itemsPerPage};

//      let {getByText} = renderWithRouterMatch(View(args),
//                                                          {path:  "/any",
//                                                           route: "/any/select"});
//      let rowOne = getByText('oneman').closest("tr");

//      fireEvent.click(rowOne);

//      await waitFor(() => {
//          rowOne = getByText('oneman').closest("tr");
//          expect(rowOne).toHaveClass('selected')
//      });
//  })
});

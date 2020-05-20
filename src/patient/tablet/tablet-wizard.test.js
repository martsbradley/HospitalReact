import React from 'react';
import {withRouter} from "react-router";
import TabletWizard from './index';
import {screen, waitFor,fireEvent}  from '@testing-library/react'
import renderWithRouterMatch from '../../test-util';
import fetchMock from 'fetch-mock';
import {med1, morphine} from './tabletSelect.test';

describe('TabletWizard', () => {
    const defaultArgs = {match: {path: '/tablets'}};

    const View = (args) =>{
        const LocationDisplay = withRouter(({ location, match }) => (
              <div data-testid="location-display">
                <TabletWizard {...args} location={location} match={match}/>;
              </div>
            ))
        return LocationDisplay;
    }

    it('Pos: loadMedicines action called', async() => {

        const args = {...defaultArgs};
        const pageInfo = {page: 1,
                          pageSize: 5,
                          nameFilter: "",
                          _dataSize: 20}

        fetchMock.mock('*', { status: 200,
                              body: {'medicines': [med1, morphine],
                                     'pageInfo': pageInfo}});

        renderWithRouterMatch(View(args),
                              { path:  "/any",
                                route: "/any/select"});

        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeDisabled();

        await waitFor(() => {
            let rowOne = screen.getByText('oneman').closest("tr");
            expect(rowOne).not.toHaveClass("selected");
            screen.debug(rowOne);
        });
    });
})

    //});

   //   let rowOne = screen.getByText('oneman').closest("tr");
   //   fireEvent.click(rowOne); // Now select a row.

//      await waitFor(() => {
//        expect(screen.getByRole('heading')).toHaveTextContent('Prescription Select Medicine');
//        expect(screen.getByText('Morphine')).toBeInTheDocument()
//        console.log("RowOne before >>>>>>>>>>>>>>>.")
//        screen.debug(rowOne);
//        console.log("RowOne before <<<<<<<<<<<<<<<.")

//        fireEvent.click(rowOne); // Now select a row.

//        expect(screen.getByText('Next')).not.toBeDisabled();
//        console.log("RowOne after click>>>>>>>>>>>>>>>.")
//        screen.debug(rowOne);
//        console.log("RowOne after click<<<<<<<<<<<<<<<.")
//      })
//    })

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
//});

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
        const LocationDisplay = withRouter(({ location, match, history}) => (
              <div data-testid="location-display">
                <TabletWizard {...args} location={location} match={match} history={history}/>;
              </div>
            ))
        return LocationDisplay;
    }


    beforeAll(() => {
        const pageInfo = {page: 1,
                          pageSize: 5,
                          nameFilter: "",
                          _dataSize: 20}

        fetchMock.mock('*', { status: 200,
                              body: {'medicines': [med1, morphine],
                                     'pageInfo': pageInfo}});

    });

    const renderTwoRows = () => {
        const args = {...defaultArgs};

        renderWithRouterMatch(View(args),
                              { path:  "/any",
                                route: "/any/select"});
    }

    it('Pos: tablet not selected', async() => {

        renderTwoRows();

        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeDisabled();

        await waitFor(() => {
            let rowOne = screen.getByText('oneman').closest("tr");
            expect(rowOne).not.toHaveClass("selected");
        });
    });

    it('Pos: tablet selected', async() => {

        renderTwoRows();

        const nextButton = screen.getByText('Next')
        expect(nextButton).toBeDisabled();

        let text = await screen.findByText('oneman')
            
        let rowOne = text.closest("tr");
        fireEvent.click(rowOne); // Now select a row.

        await waitFor(() => {
            let rowOne = screen.getByText('oneman').closest("tr");
            expect(rowOne).toHaveClass("selected");
            expect(nextButton).not.toBeDisabled();
        });
    });

    it('Pos: tablet start date', async() => {

        renderTwoRows();

        let text = await screen.findByText('oneman')
        let rowOne = text.closest("tr");
        fireEvent.click(rowOne); // Now select a row.

        const nextButton = screen.getByText('Next')

        console.log("Click the next button just the once");
        fireEvent.click(nextButton); 

        await waitFor(() => {
            const heading = screen.getByRole("heading");
            expect(heading).toHaveTextContent("Prescription Select Start Date");
            screen.debug(heading);
        });
    });
})

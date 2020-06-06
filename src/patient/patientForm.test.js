import React from 'react';
import PatientForm from './patientForm';
import { withRouter } from "react-router";
import renderWithRouterMatch from '../test-util';
import {emptyPatient} from '../redux/initialstore';

import {
//    getByRole,
//    getNodeText,
//    getByLabelText,
//    getByText,
//    getByTestId,
//    queryByTestId,
//    // Tip: all queries are also exposed on an object
//    // called "queries" which you could import here as well
//    waitFor,
} from '@testing-library/dom'

describe('PatientForm', () => {

    const doesNothing = () => {}
    const validation = []
    const defaultArgs = { patient          : emptyPatient,
                          loadPatient      : doesNothing,
                          unLoadPatient    : doesNothing,
                          savePatient      : doesNothing,
                          clearValidations : doesNothing,
                          validation       : validation};

    const Wrapper = (args) =>{
        const LocationDisplay = withRouter(({ location, match }) => (
              <div data-testid="location-display">
                <PatientForm {...args} location={location} match={match}></PatientForm>
              </div>
            ))
        return LocationDisplay;
    }

    it('Edit', async () => {
      const loadPatient = jest.fn();
      const args = {...defaultArgs, loadPatient};

        const {getByRole} = renderWithRouterMatch(Wrapper(args),
                                        { path:  "/patient/:patientId",
                                          route: "/patient/100"});

        expect(getByRole('heading')).toHaveTextContent("Edit Patient");
        expect(loadPatient).toHaveBeenCalledTimes(1);
    });

    it('New', () => {
        const args = {...defaultArgs};
        const {getByRole} = renderWithRouterMatch(Wrapper(args),
                                        { path:  "/patient/new",
                                          route: "/patient/new"});
        expect(getByRole('heading')).toHaveTextContent("New Patient");
    });

    it('New not calling load', () => {

        const loadPatient = jest.fn();

        const args = {...defaultArgs, loadPatient};
        const {getByRole} = renderWithRouterMatch(Wrapper(args),
                                        { path:  "/patient/new",
                                          route: "/patient/new"});

        expect(getByRole('heading')).toHaveTextContent("New Patient");
        expect(loadPatient).not.toBeCalled();
        expect(loadPatient).toHaveBeenCalledTimes(0);
    });
})

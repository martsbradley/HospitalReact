import React from 'react';
import PatientForm from './patientForm';
import {mount,shallow} from 'enzyme';
import {emptyPatient} from './emptyPatient';
import {BrowserRouter} from 'react-router-dom';

const doesNothing = () => {}
const validation = []

describe('<PatientForm />', () => {
    it('renders without crashing', () => {
        shallow(<PatientForm loadPatient={doesNothing}
                             unLoadPatient={doesNothing}
                             savePatient={doesNothing}
                             clearValidations={doesNothing}
                             validation={validation} />);
        }
    )
    it('Normal Stuff works', () => {

        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThanOrEqual(4.5);
        expect(value).toBe(4);
    })

    it('Title "Edit Patient" when patientId param provided', () => {

       const wrapper = mount(
           <BrowserRouter>
               <PatientForm
                       match={{params: {patientId: 1}, 
                                        isExact: true, 
                                        path: "", 
                                        url: ""}} 
                       loadPatient={doesNothing}
                       unLoadPatient={doesNothing}
                       savePatient={doesNothing}
                       clearValidations={doesNothing}
                       validation={validation} 
                       patient={emptyPatient} />
           </BrowserRouter>
       );

       const firstHeading     = wrapper.find('h1').at(0);
       const firstHeadingText = firstHeading.childAt(0).text();

       expect(firstHeadingText).toBe("Edit Patient");
    })

    it('Title "New Patient" when patientId param omitted', () => {
       const wrapper = mount(
           <BrowserRouter>
               <PatientForm
                       loadPatient={doesNothing}
                       unLoadPatient={doesNothing}
                       savePatient={doesNothing}
                       clearValidations={doesNothing}
                       validation={validation} 
                       patient={emptyPatient} />
           </BrowserRouter>
       );

       const firstHeading     = wrapper.find('h1').at(0);
       const firstHeadingText = firstHeading.childAt(0).text();

       expect(firstHeadingText).toBe("New Patient");
    })
})

import React from 'react';
import Medicine from './medicine';
//import {mount,shallow} from 'enzyme';
import {shallow} from 'enzyme';
//import {BrowserRouter} from 'react-router-dom';

const doesNothing = () => {}
//const validation = []

describe('Medicine', () => {
    it('Pos: renders without crashing', () => {

        const meds = [];

        shallow(<Medicine meds={meds}
                          selectedMedicine={1}
                          mouseDisabled={false}
                          mouseClicked={doesNothing} />);
        }
    )

    it('Pos: renders two meds', () => {
         const med1 = { id: 1,
                        name: 'one',
                        manufacturer: 'oneman',
                        deliveryMethod: 'mouth'};
         const med2 = { id: 2,
                        name: 'two',
                        manufacturer: 'twoman',
                        deliveryMethod: 'injection'};
        const meds = [med1, med2]

        const wrapper = 
            shallow(<Medicine meds={meds}
                              selectedMedicine={1}
                              mouseDisabled={false}
                              mouseClicked={doesNothing} />);
        
        const rows = wrapper.find('tr');
        const rowOne     = rows.at(1);
        let firstCell    = rowOne.childAt(0).text();
        let secondCell = rowOne.childAt(1).text();
        expect(firstCell).toBe("1");
        expect(secondCell).toBe("one");

        const rowTwo = rows.at(2);
        firstCell    = rowTwo.childAt(0).text();
        secondCell   = rowTwo.childAt(1).text();
        expect(firstCell).toBe("2");
        expect(secondCell).toBe("two");
    })
})

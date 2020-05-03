import React from 'react';
import TabletWizard from './index';
import {mount,shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';

const doesNothing = () => {}

describe('TabletWizard', () => {

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
  
    afterEach(() => {
      jest.clearAllMocks();
    });

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

    function tabletWizard(args = defaultArgs){

        const {loadMedicines, medicines, activePage, 
         itemsPerPage, match, totalItemsCount} = args;

        return <TabletWizard loadMedicines={loadMedicines}
                             medicines={medicines}
                             activePage={activePage}
                             itemsPerPage={itemsPerPage}
                             match={match}
                             totalItemsCount={totalItemsCount} />;
    }

    it('Pos: renders without crashing', () => {
        shallow(tabletWizard());
    })

    it('Pos: loadMedicines action called', (done) => {

        const loadMedicines = (activePage,itemsPerPage) => {
            console.log(`loading ${activePage} ${itemsPerPage}`);
            expect(activePage).toBe(3);
            expect(itemsPerPage).toBe(10);
            done();
        }

        const args = {...defaultArgs,
                      loadMedicines: loadMedicines,
                      activePage: 3,
                      itemsPerPage:10};

        mount(<BrowserRouter>
                {tabletWizard(args)}
              </BrowserRouter>);

    })

    it('Pos: selected medicine action called', (done) => {

        const loadMedicines = (activePage,itemsPerPage) => {
            console.log(`loading ${activePage} ${itemsPerPage}`);
            expect(activePage).toBe(3);
            expect(itemsPerPage).toBe(10);
        }

        const args = {...defaultArgs,
                      loadMedicines: loadMedicines,
                      activePage: 3,
                      itemsPerPage:10};

        const wrapper = mount(<MemoryRouter initialEntries={["/tablets/select"]}>
                                {tabletWizard(args)}
                              </MemoryRouter>);

        const row = wrapper.find('tr').at(1);
        
        row.simulate('click');
        done();
        // This testing i'm not fully sure how to check
        // the state with TabletWizard was updated.
    })
})

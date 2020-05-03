import React from 'react';
import TabletSelect from './tabletSelect';
import {mount,shallow} from 'enzyme';
//import {BrowserRouter} from 'react-router-dom';

const doesNothing = () => {}
//const validation = []

describe('TabletSelect', () => {

    const filter = "abc";

    const totalItemsCount=20;
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

    it('Pos: renders without crashing', () => {

        const meds = [];

        shallow(<TabletSelect 
                          medicines={meds}
                          totalItemsCount={totalItemsCount}
                          pageChanged={doesNothing}
                          filter={filter} />);
        }
    )

    const defaultArgs= {filter: "abc",
                        totalItemsCount: 20,
                        meds: medArray,
                        loadMedicines: loadMedicines,
                        filterChanged: doesNothing,
                        pageChanged:   doesNothing,
                        medicineClicked:   doesNothing};

    // This makes it easier to construct the mounted object.
    function mountTabletSelect(args = defaultArgs) {

       const {filter, totalItemsCount, 
              meds, loadMedicines, filterChanged,
              medicineClicked} = args;

       const wrapper = mount(<TabletSelect 
                             medicines={meds}
                             totalItemsCount={totalItemsCount}
                             filter={filter} 
                             loadMedicines={loadMedicines}
                             filterChanged={filterChanged} 
                             pageChanged={doesNothing}
                             medicineClicked={medicineClicked}/>);

       return wrapper;
    }

    it('Pos: filter on change', (done) => {

        const filterChanged = (value) => {

            console.log("Filter Changed");
            const newValue = value;// event.target.value
            console.log(newValue);
            expect(newValue).toBe('Morphine');
            done();
        };


        const args = {...defaultArgs,
                      filterChanged: filterChanged};

        const wrapper = mountTabletSelect(args);

        wrapper.find('input')
               .simulate('change', { target: { name: 'filter', value: 'Morphine' } })
    })

    it('Pos: selected medicine', (done) => {

        const mouseClickHandler = (medicineId) => {
            console.log(`Medicine Selected Changed to ${medicineId}`);
            expect(medicineId).toBe(1);
            done();
        };

        const args = {...defaultArgs,
                      medicineClicked: mouseClickHandler};

        const wrapper = mountTabletSelect(args);

        const row = wrapper.find('tr').at(1);
        row.simulate('click');
    })
})

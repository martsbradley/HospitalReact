import React from 'react';
import TabletSelect from './tabletSelect';
import {render, fireEvent,screen, within} from '@testing-library/react'
import { /*getByLabelText, getByText,*/ } from '@testing-library/dom'

const doesNothing = () => {}
export const med1 = { id: 1,
                      name: 'Ibrufen',
                      manufacturer: 'oneman',
                          deliveryMethod: 'mouth'};
export const morphine = { id: 2,
                          name: 'Morphine',
                          manufacturer: 'twoman',
                          deliveryMethod: 'injection'};

describe('TabletSelect', () => {

    const medArray = [med1, morphine]
                              
    const defaultArgs= {selectedMedId   : -1,
                        medicineSelected: doesNothing,
                        medicines       : medArray,
                        activePage      : 1,
                        itemsPerPage    : 5,
                        totalItemsCount : 10,
                        filter          : 'abc',
                        pageChanged     : jest.fn()};

    it('Pos: filter change', async () => {

        const pageChanged = jest.fn();
        let args  = { ...defaultArgs, pageChanged}

        const {rerender/*, debug*/} = render(<TabletSelect {...args} />);

        screen.getByText('Morphine').closest("tr");
        screen.getByText('Ibrufen').closest("tr");
        let table = screen.getByText('Ibrufen').closest("tbody");
        let rows = within(table).queryAllByRole("row")
        expect(rows).toHaveLength(2);

        const filterTextBox = screen.getByLabelText('Filter:');
        fireEvent.change(filterTextBox, { target: { value: 'Morphine' } });

        expect(pageChanged).toHaveBeenCalledTimes(2);

        const medicines = [morphine];
        args  = { ...defaultArgs, pageChanged, medicines};
        
        rerender(<TabletSelect {...args} />);

        table= screen.getByText('Morphine').closest("tbody");
        rows = within(table).queryAllByRole("row")
        expect(rows).toHaveLength(1);
        expect(screen.queryByText('Ibrufen')).not.toBeInTheDocument();
        //debug(rows);
    });

    it('Pos: selected medicine', (done) => {

        const clickHandler  = jest.fn()
        clickHandler.mockImplementationOnce(() => {})
        clickHandler.mockImplementationOnce(() => {done();});

        const args = {...defaultArgs,
                      medicineSelected: clickHandler};

        /*const {debug} =*/ render(<TabletSelect {...args} />);

        const rowOne = screen.getByText('Ibrufen').closest("tr");
        const rowTwo = screen.getByText('Morphine').closest("tr");

        fireEvent.click(rowOne);
        fireEvent.click(rowTwo);

        expect(clickHandler.mock.calls[0][0]).toEqual({id:1, name:'Ibrufen'});
        expect(clickHandler.mock.calls[1][0]).toEqual({id:2, name:'Morphine'});
        //debug(rowTwo);
    })
})

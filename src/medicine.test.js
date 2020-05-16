import React from 'react';
import Medicine from './medicine';
//import {render, fireEvent, screen} from '@testing-library/react'
import {render, screen, within} from '@testing-library/react'
const doesNothing = () => {}

describe('Medicine', () => {
    const med1 = { id: 1,
                   name: 'one',
                   manufacturer: 'oneman',
                   deliveryMethod: 'mouth'};
    const med2 = { id: 2,
                   name: 'two',
                   manufacturer: 'twoman',
                   deliveryMethod: 'injection'};

    it('Pos: two rows one selected', () => {
        const meds = [med1, med2];

        render(<Medicine meds={meds}
                         selectedMedicine={1}
                         mouseDisabled={false}
                         mouseClicked={doesNothing} />);

        const row = screen.getByText('oneman').closest("tr");

        expect(row).toHaveClass('selected');
        const utils = within(row);
        expect(utils.queryByText('oneman')).toBeInTheDocument();
        //expect(utils.queryByText('oneman')).toBeInTheDocument();

        // Check that the table contains the row, a bit silly maybe.
        const table = screen.getByText('oneman').closest("table");
        expect(table).toContainElement(row);

        const rowtwo = screen.getByText('twoman').closest("tr");
        expect(rowtwo).not.toHaveClass('selected');
    });
})

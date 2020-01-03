import React from 'react'
import PropTypes from 'prop-types';

export default function DrawIt({count, increment, decrement, reset}) {
   return <>
   <h2>Martin Here {count} thats it.</h2>
   <h3>more stuff</h3>
   <button onClick={increment}>up</button>
   <button onClick={decrement}>decrement</button>
   <button onClick={reset}>zero</button>
   </>;
}

DrawIt.propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func,
    decrement  : PropTypes.func,
    reset : PropTypes.func
}

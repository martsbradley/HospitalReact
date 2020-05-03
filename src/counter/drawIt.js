import React from 'react'
import PropTypes from 'prop-types';

export default function DrawIt({count, increment, decrement, reset,
    doit,...props}) {
   return <>

   <h2>123 Bradley why {count} thats it.</h2>
   <h3>Some stuff Seen</h3>
   <button onClick={increment}>up</button>
   <button onClick={decrement}>decrement</button>
   <button onClick={reset}>zero</button>
   <button onClick={() => doit(props.history)}>doit</button>
   </>;
}

DrawIt.propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func,
    decrement  : PropTypes.func,
    reset : PropTypes.func,
    doit : PropTypes.func,
    history : PropTypes.object,
}

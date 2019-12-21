import React from 'react'
export default function DrawIt({count, increment, decrement, reset, ...props}) {
   return <>
   <h2>Martin Here {count} thats it.</h2>
   <h3>more stuff</h3>
   <button onClick={increment}>up</button>
   <button onClick={decrement}>decrement</button>
   <button onClick={reset}>zero</button>
   </>;
}

import React from 'react'

export default function ValidationMessage(props) {
    if (props.when) {
        return <div>Error: Please select a medicine.</div>
    }
    return "";
}

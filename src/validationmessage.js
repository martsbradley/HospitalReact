import React from 'react'

export default function ValidationMessage(props) {
    if (props.when) {
        return <div>{props.what}</div>
    }
    return "";
}

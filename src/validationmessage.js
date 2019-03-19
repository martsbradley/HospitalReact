import React from 'react'

export default function ValidationMessage(props) {
    if (props.when) {
        return <div>{props.what}</div>
    }
    return "";
}

export function showValidationMessages(validations) {
    const errors = validations.errors

    for (var i = 0; i < errors.length; i++) {
        const name = errors[i].field
        const message = errors[i].message
        const formField = document.querySelector("span[name='" + name + ".errors']")
        formField.innerText = message
    }
}

export function clearValidationMessages(aFieldName) {
    const formField = document.querySelector("span[name='" + aFieldName + ".errors']")
    formField.innerText = '';
}

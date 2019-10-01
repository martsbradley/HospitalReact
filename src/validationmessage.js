import React from 'react'

export default function ValidationMessage(props) {
    if (props.when) {
        return <div><span className="errors">{props.what}</span></div>
    }
    return "";
}

export function showValidationMessages(validations) {
    const errors = validations.errors

    for (var i = 0; i < errors.length; i++) {
        const name = errors[i].field
        const message = errors[i].message

        var formField = document.querySelector("span[name='" + name + ".errors']")

        if (formField == null) {
            formField = document.querySelector("span[name='page.error']")
        }

        if (formField != null) {
            formField.innerText = message
        }
        else {
            alert(message);
        }
    }
}

export function clearValidationMessages(aFieldName) {
    const formField = document.querySelector("span[name='" + aFieldName + ".errors']")

    if (formField != null) {
        formField.innerText = '';
    }
    else {
        alert("Cannot find clear field '" + aFieldName + "' to clear it.");
    }
}

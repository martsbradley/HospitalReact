import React from 'react'

export default function ValidationMessage(props) {
    if (props.when) {
        return <div><span className="errors">{props.what}</span></div>
    }
    return "";
}

export function showValidationMessages(validations) {
    const errors = validations;

    for (var i = 0; i < errors.length; i++) {
        const name = errors[i].field
        const message = errors[i].message

        console.log("name in validation is " + name);
        const lookingFor = 'span[name="' + name + '.errors"]';

        var formField = document.querySelector(lookingFor)

        console.log("formField is " + formField + " when looking for '" + lookingFor + "'");

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

export function showPrefixValidationMessages(validations, prefix){
    const errors = validations;

    for (var i = 0; i < errors.length; i++) {
        const field = errors[i].field
        const message = errors[i].message

        console.log("field in validation is " + field);

        if (field.startsWith(prefix)){
            field = field.substring(prefix.length + 1);
        }
        console.log("field is now " + field);

        const lookingFor = 'span[class="errors"][name="' + field + '"]';

        var formField = document.querySelector(lookingFor)

        console.log("formField is " + formField + " when looking for '" + lookingFor + "'");

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

   // put validations into way they can be shown with normal react code.

export function getValidationMessages(patient, prefix, validation) {
    const val  = {};
    let array  = Object.keys(patient);
    array.map(k => val[k] = '');

    for (var i = 0; i < validation.length; i++) {
        const name    = validation[i].field
        const message = validation[i].message

        let field = name;

        if (name.startsWith(prefix)){
            field = name.substring(prefix.length + 1);
        }

        if (!field in val) {
            val[field] = message;
        } else {
            val[field] += '</br>'
            val[field] = message;
        }
    }
    return val;
}

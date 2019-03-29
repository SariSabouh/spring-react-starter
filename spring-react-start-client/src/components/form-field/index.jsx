import React from 'react'
import PropTypes from 'prop-types'
import {Field as ReduxFormField} from 'redux-form'

import Field from '../field'

const FormField = ({label, type, name, placeholder, classes, rowClasses, defaultChecked, disabled}) => {
    const inputOptions = {
        type,
        placeholder,
        defaultChecked,
        disabled
    }

    let inputField = <input {...inputOptions} className="form-control form-control-lg" />
    if (type === 'textarea') {
        inputField = <textarea {...inputOptions} className="form-control form-control-lg" />
    }

    return (
        <div className={`c-form-field ${rowClasses}`}>
            <ReduxFormField
                className={classes}
                name={name}
                label={label}
                type={type}
                component={Field} >

                {inputField}
            </ReduxFormField>
        </div>
    )
}

FormField.propTypes = {
    label: PropTypes.node,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    classes: PropTypes.string,
    defaultChecked: PropTypes.bool,
    placeholder: PropTypes.string,
    rowClasses: PropTypes.string
}

export default FormField

import React, { PropTypes } from 'react'
import classNames from 'classnames'

/**
 * A horizontal rule element that can display an optional label as a heading.
 */
const Divider = (props) => {
    const {
        className,
        label
    } = props

    const classes = classNames('pw-divider', {
        'pw--no-label': !props.label
    }, className)

    return (
        <div className={classes}>
            {!!label &&
                <span className="pw-divider__text">
                    {label}
                </span>
            }
        </div>
    )
}

Divider.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element.
     */
    className: PropTypes.string,

    /**
     * Label to be displayed as Divider's heading.
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default Divider

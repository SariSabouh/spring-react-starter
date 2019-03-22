import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {onKeyUpWrapper} from '../../utils/a11y-utils'

import {Link} from 'react-router-dom'
import Icon from '../icon'

/**
 * A styleable, accessible `<button>` component.
 */

const Button = (props) => {

    const {
        // Values
        href,
        icon,
        iconSize,
        iconClassName,
        innerClassName,
        showIconText,
        text,
        title,
        type,

        // Attributes
        id,
        children,
        className,
        disabled,
        name,
        value,
        role,
        openInNewTab,

        // Handlers
        onClick,
    } = props

    const classes = classNames('c-button', {
        'c--anchor': !!href,
        'c--icon-only': !!icon && !children
    }, className)
    const innerClass = classNames('c-button__inner', innerClassName)
    const iconClass = classNames('c-button__icon', iconClassName, {
        'c--has-siblings': children || (title && showIconText)
    })
    const textClass = classNames('c-button__text', {
        'u-visually-hidden': !showIconText
    })
    const attrs = {
        href, id, disabled, name, value, role, onClick,
        onKeyUp: onKeyUpWrapper(onClick),
        className: classes
    }

    let childrenNodes

    if (icon) {
        childrenNodes = [
            <Icon className={iconClass} size={iconSize} name={icon} key="autoicon" />,
            title && <span className={textClass} key="autotitle">{title}</span>
        ]

        if (typeof children === 'string') {
            childrenNodes.push(children)
        } else {
            childrenNodes.push(
                ...(children || [])
            )
        }
    } else {
        childrenNodes = text || children
    }

    // Add all aria and data attributes
    Object.keys(props).forEach((key) => {
        if (/^(aria|data)-/.test(key)) {
            attrs[key] = props[key]
        }
    })

    if (href) {
        return (
            <Link {...attrs} target={openInNewTab ? '_blank' : ''}>
                <div className={innerClass}>{childrenNodes}</div>
            </Link>
        )
    } else {
        return (
            <button {...attrs} type={type}>
                <div className={innerClass}>{childrenNodes}</div>
            </button>
        )
    }
}

Button.defaultProps = {
    type: 'button'
}

Button.propTypes = {
    /**
     * Any children to be nested within this button.
     */
    children: PropTypes.node,

    /**
     * Adds values to the `class` attribute of the root element.
     */
    className: PropTypes.string,

    /**
     * Defines if button is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * If specified, the component is rendered as a link, with this value set as the href.
     */
    href: PropTypes.string,

    /**
     * If specified, includes an icon of the given name in the button.
     * For more information about available icons, see the [Icon component](#!/Icon).
     */
    icon: PropTypes.string,

    /**
     * Adds values to the class attribute in <Icon> component.
     */
    iconClassName: PropTypes.string,

    /**
     * If specified, will set the icon to the size of your choice.
     */
    iconSize: PropTypes.string,


    /**
     * Sets the `id` attribute of the root element.
     */
    id: PropTypes.string,

    /**
     * Adds values to the class attribute of the inner container.
     */
    innerClassName: PropTypes.string,

    /**
     * The button's `name` attribute.
     */
    name: PropTypes.string,

    /**
     * For use with Buttons with an href set.
     *
     * If true, target="_blank" will be added to the button.
     * Only use this property if you trust the link! https://mathiasbynens.github.io/rel-noopener
     */
    openInNewTab: PropTypes.bool,

    /**
     * The button's `role` attribute.
     */
    role: PropTypes.string,

    /**
    * For use when the icon and title attributes have been defined.
    * If false, `u-visually-hidden` class will be added to the container that wraps
    * the title attribute. If true, `u-visually-hidden` will be removed.
    *
    */
    showIconText: PropTypes.bool,

    /**
     * Text contents of the button.
     */
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /**
     * The title to be used for accessibility (generally if `icon` is used).
     * If showIconText is set to true, this text will be shown with the icon
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /**
     * Specifies button type, defaults to `button`.
     */
    type: PropTypes.oneOf(['button', 'submit']),

    /**
     * The button's `value` attribute.
     */
    value: PropTypes.string,

    /**
     * User-defined method for hooking into click events.
     */
    onClick: PropTypes.func
}

export default Button

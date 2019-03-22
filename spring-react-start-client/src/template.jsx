import React from 'react'
import PropTypes from 'prop-types'

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const template = (WrappedComponent) => {
    class Template extends React.Component {
        constructor(props) {
            super(props)

            this.WrappedComponent = WrappedComponent
        }

        dispatchRouteChange({fetchAction, dispatch}) {
            if (fetchAction) {
                dispatch(fetchAction())
            }
        }

        componentWillMount() {
            this.dispatchRouteChange(this.props)
        }

        render() {
            return (<WrappedComponent {...this.props} />)
        }
    }
    Template.WrappedComponent = WrappedComponent
    Template.displayName = `Template(${getDisplayName(WrappedComponent)})`
    Template.propTypes = {
        dispatch: PropTypes.func,
        location: PropTypes.object,
        retryingConnection: PropTypes.bool
    }

    return Template
}

export default template

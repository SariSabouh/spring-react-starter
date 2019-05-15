import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { initSession } from './utils/request-utils'

const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component'

const template = (WrappedComponent) => {
    class Template extends React.Component {
        constructor(props) {
            super(props)

            this.WrappedComponent = WrappedComponent
        }

        dispatchRouteChange({ fetchAction, dispatch, history }) {
            this.props.initSession(history)
                .then(() => {
                    if (fetchAction) {
                        dispatch(fetchAction(this.props))
                    }
                })
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
        initSession: PropTypes.func,
        retryingConnection: PropTypes.bool
    }

    const mapDispatchToProps = {
        initSession
    }

    return connect(null, mapDispatchToProps)(Template)
}

export default template

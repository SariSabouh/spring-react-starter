import React, { Component } from 'react'
import template from '../../template'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import Backlog from './partials/Backlog'

class ProjectBoard extends Component {
    render() {
        const {id} = this.props.match.params
        return (
            <div className="t-project-board">
                <div className="container">
                    <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    </Link>
                    <br />
                    <hr />
                    <Backlog />
                </div>
            </div >
        )
    }
}

ProjectBoard.propTypes = {}

const mapStateToProps = createPropsSelector({})

export default template(connect(mapStateToProps)(ProjectBoard))

import React, { Component } from 'react'
import template from '../../template'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import Backlog from './partials/Backlog'
import { getCurrentTaskList, getProjectNotFoundError } from './selectors';
import { setCurrentTaskList } from './actions';

class ProjectBoard extends Component {
    componentWillUnmount() {
        this.props.setCurrentTaskList({tasksList: undefined})
    }

    render() {
        const {tasksList, match, projectNotFoundError} = this.props
        return (
            <div className="t-project-board">
                {!projectNotFoundError ?
                    <div className="container">
                        <Link to={`/addProjectTask/${match.params.id}`} className="btn btn-primary mb-3">
                            <i className="fas fa-plus-circle"> Create Project Task</i>
                        </Link>
                        <br />
                        <hr />
                        {tasksList && tasksList.length ?
                            <Backlog tasksList={tasksList} />
                        :
                            <div className="alert alert-info text-center">No Project Tasks on this board</div>
                        }
                    </div>
                :
                    <div className="alert alert-danger text-center container">{projectNotFoundError}</div>
                }
            </div >
        )
    }
}

ProjectBoard.propTypes = {
    projectNotFoundError: PropTypes.string,
    tasksList: PropTypes.array,
    setCurrentTaskList: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    tasksList: getCurrentTaskList,
    projectNotFoundError: getProjectNotFoundError
})

const mapDispatchToProps = {
    setCurrentTaskList
}

export default template(connect(mapStateToProps, mapDispatchToProps)(ProjectBoard))

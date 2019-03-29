import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectTask from './ProjectTask'

class Backlog extends Component {
    render() {
        const {tasksList} = this.props
        const todoTasks = []
        const inProgressTasks = []
        const doneTasks = []
        tasksList && tasksList.forEach((task, idx) => {
            if (task.status === 'IN_PROGRESS') {
                inProgressTasks.push(<ProjectTask key={idx} {...task} />)
            } else if (task.status === 'DONE') {
                doneTasks.push(<ProjectTask key={idx} {...task} />)
            } else {
                todoTasks.push(<ProjectTask key={idx} {...task} />)
            }
        })
        return (
            <div className="t-backlog">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>
                            {todoTasks}
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-primary text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {inProgressTasks}
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {doneTasks}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Backlog.propTypes = {
    tasksList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        projectSequence: PropTypes.string,
        summary: PropTypes.string,
        acceptanceCriteria: PropTypes.string,
        status: PropTypes.string,
        priority: PropTypes.number,
        dueDate: PropTypes.string,
        created_At: PropTypes.string,
        updated_At: PropTypes.string,
        projectIdentifier: PropTypes.string
    }))
}

export default Backlog

import React, { Component } from 'react'
import template from '../../template'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'

import ProjectItem from './partials/ProjectItem'
import CreateProjectButton from './partials/CreateProjectButton'

import {getProjectsList} from '../../store/project/selectors'

class Dashboard extends Component {
    render() {
        const {projects} = this.props
        return (
            <div className="t-dashboard projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <CreateProjectButton />
                            <br />
                            <hr />
                            {projects.map((project, idx) => <ProjectItem key={idx} project={project} />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    projects: PropTypes.array
}

const mapStateToProps = createPropsSelector({
    projects: getProjectsList
})

export default template(connect(mapStateToProps)(Dashboard))

import React from 'react'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'
import template from 'template'

import { getProjectsList } from 'store/project/selectors'
import ProjectItem from './partials/ProjectItem'
import CreateProjectButton from './partials/CreateProjectButton'


const Dashboard = ({ projects }) => (
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

Dashboard.propTypes = {
    projects: PropTypes.array
}

const mapStateToProps = createPropsSelector({
    projects: getProjectsList
})

export default template(connect(mapStateToProps)(Dashboard))

import React from 'react'
import { Link } from 'react-router-dom'

const CreateProjectButton = () => (
    <React.Fragment>
        <Link to="/addProject" className="t-create-project-button btn btn-lg btn-info">Create a Project</Link>
    </React.Fragment>
)

export default CreateProjectButton

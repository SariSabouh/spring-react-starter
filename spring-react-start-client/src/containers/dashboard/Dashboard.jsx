import React, { Component } from 'react'

import ProjectItem from '../project/ProjectItem'

class Dashboard extends Component {
    render() {
        return (
            <div className="t-dashboard projects">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="display-4 text-center">Projects</h1>
                            <br />
                            <a href="ProjectForm.html" class="btn btn-lg btn-info">Create a Project</a>
                            <br />
                            <hr />

                            <ProjectItem />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard

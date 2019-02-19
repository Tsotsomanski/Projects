import React from 'react';
import './project.css';

const ProjectSummary = ( props ) => {
    return (
        <div className="card z-depth-0 project-summary N/A transparent project-info-card">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">Project title</span>
                <p>Posted by the Sn3 Ninja</p>
                <p className="grey-text">3rd September, 2am</p>
            </div>
        </div>
    )
};

export default ProjectSummary;
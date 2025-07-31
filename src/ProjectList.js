import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectList({ projects }) {
  return (
    <div className="labs-main">
      {projects.map((project, idx) => (
        <ProjectCard
          key={idx}
          title={project.title}
          description={project.description}
          buttonText={project.buttonText}
          colorClass={project.colorClass}
          path={project.path}
          createdBy={project.createdBy}
        >
          {project.renderImage()}
        </ProjectCard>
      ))}
    </div>
  );
}

export default ProjectList; 
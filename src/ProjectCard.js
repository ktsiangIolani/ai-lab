import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import mlClass from './ml_class.png';
import introAI from './introAI.png';
const profilesPics = {
    "Whose DNA?": mlClass,
    "\'IO GPT": introAI,
}
function ProjectCard({ title, description, buttonText, colorClass, children, path, createdBy, profilePic }) {
  return (
    <div className={`labs-card ${colorClass}`}>
      <div className="labs-card-image">{children}</div>
      <div className="labs-card-content">
        <h2>{title}</h2>
        <div className="labs-card-subtitle">
          <img src={profilesPics[title]} alt="Profile" className="labs-card-profile-pic" />
          <span>Created By {createdBy}</span>
        </div>
        <p>{description}</p>
        <Link to={path} className="labs-btn">{buttonText}</Link>
      </div>
    </div>
  );
}

export default ProjectCard; 
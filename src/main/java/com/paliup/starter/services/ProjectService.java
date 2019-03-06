package com.paliup.starter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.Project;
import com.paliup.starter.exceptions.ProjectIdException;
import com.paliup.starter.repositories.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			return projectRepository.save(project);
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
		}
	}
	
	public Project findProjetByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if (project == null) {
			throw new ProjectIdException("Project ID '" + projectId.toUpperCase() + "' does not exist");
		}
		return  project;
	}
	
	public Iterable<Project> findAllProjects() {
		return projectRepository.findAll(); 
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId);
		
		if (project == null) {
			throw new ProjectIdException("Cannot delete Project with ID '" + projectId.toUpperCase() + "'. This project does not exist");
		}
		
		projectRepository.delete(project);
	}
}

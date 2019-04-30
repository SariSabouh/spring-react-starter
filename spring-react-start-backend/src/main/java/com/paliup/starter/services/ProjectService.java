package com.paliup.starter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.User;
import com.paliup.starter.exceptions.ProjectIdException;
import com.paliup.starter.repositories.BacklogRepository;
import com.paliup.starter.repositories.ProjectRepository;
import com.paliup.starter.repositories.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project, String username) {
		String projectIdentifier = project.getProjectIdentifier().toUpperCase();
		try {
			User user = userRepository.findByUsername(username);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
			project.setProjectIdentifier(projectIdentifier);

			if (project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIdentifier);
			} else {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
			}

			return projectRepository.save(project);
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists");
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

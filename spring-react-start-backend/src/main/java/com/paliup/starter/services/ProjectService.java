package com.paliup.starter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.User;
import com.paliup.starter.exceptions.ProjectIdException;
import com.paliup.starter.exceptions.ProjectNotFoundException;
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
	
	public Project saveOrUpdateProject(Project project) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
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
			} else if (project.getId() != null) {
				Project existingProject = projectRepository.findByProjectIdentifier(projectIdentifier);
				
				if(existingProject != null && (!existingProject.getUser().getUsername().equals(username)
						|| existingProject.getId() != project.getId())) {
					throw new ProjectNotFoundException("Project not found in your account");
				}
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
			}

			return projectRepository.save(project);
		} catch (Exception e) {
			if (e.getClass().getSimpleName().equals(ProjectNotFoundException.class.getSimpleName())) {
				throw new ProjectNotFoundException(e.getMessage());
			}
			throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists");
		}
	}
	
	public Project findProjetByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase()); // TODO check if its better to create a new SQL rather than filter below
		if (project == null) {
			throw new ProjectIdException("Project ID '" + projectId.toUpperCase() + "' does not exist");
		}
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if (!project.getProjectLeader().equals(username)) {
			throw new ProjectNotFoundException("Project not found in your account"); // TODO remove this throw and add it to one exception above
		}
		
		return  project;
	}
	
	public Iterable<Project> findAllProjects() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return projectRepository.findAllByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		projectRepository.delete(findProjetByIdentifier(projectId));
	}
}

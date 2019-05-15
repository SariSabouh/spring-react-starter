package com.paliup.starter.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	Logger logger = LoggerFactory.getLogger(ProjectService.class);

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
				logger.info("New Project saved");
				logger.debug("New Project saved with id: " + projectIdentifier);
			} else if (project.getId() != null) {
				Project existingProject = projectRepository.findByProjectIdentifier(projectIdentifier);
				
				if(existingProject != null && (!existingProject.getUser().getUsername().equals(username)
						|| existingProject.getId() != project.getId())) {
					logger.warn("Project " + projectIdentifier + " not found in account " + username);
					throw new ProjectNotFoundException("Project not found in your account");
				}
				logger.info("Project updated");
				logger.debug("Project " + projectIdentifier + " updated");
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
			}

			return projectRepository.save(project);
		} catch (Exception e) {
			if (e.getClass().getSimpleName().equals(ProjectNotFoundException.class.getSimpleName())) {
				throw new ProjectNotFoundException(e.getMessage());
			}
			logger.warn("Project " + projectIdentifier + " already exists");
			throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists");
		}
	}
	
	public Project findProjetByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if (project == null || !project.getProjectLeader().equals(username)) {
			logger.warn("Project " + projectId + " not found in account " + username);
			throw new ProjectNotFoundException("Project not found in your account");
		}
		
		logger.info("Project found");
		logger.debug("Project " + projectId + " found");
		return  project;
	}
	
	public Iterable<Project> findAllProjects() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		logger.info("findAllProjects executed");
		return projectRepository.findAllByProjectLeader(username);
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		logger.info("deleteProject executed");
		logger.debug("deleteProject executed for " + projectId);
		projectRepository.delete(findProjetByIdentifier(projectId));
	}
}

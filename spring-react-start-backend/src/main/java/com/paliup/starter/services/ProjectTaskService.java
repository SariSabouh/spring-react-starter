package com.paliup.starter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.exceptions.ProjectNotFoundException;
import com.paliup.starter.repositories.BacklogRepository;
import com.paliup.starter.repositories.ProjectRepository;
import com.paliup.starter.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		try {
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			projectTask.setBacklog(backlog);
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence++;
			backlog.setPTSequence(backlogSequence);
			projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);
			
			if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
				projectTask.setPriority(3);
			}
			
			if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
				projectTask.setStatus("TODO");;
			}
			
			return projectTaskRepository.save(projectTask);
		} catch (Exception e) {
			throw new ProjectNotFoundException("ProjectNotFound: '" + projectIdentifier + "'");
		}
	}

	public Iterable<ProjectTask> findBacklogById(String backlogId) {
		Project project = projectRepository.findByProjectIdentifier(backlogId);
		if (project == null) {
			throw new ProjectNotFoundException("Project with ID: '" + backlogId + "' does not exist"); // TODO check if necessary
		}
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
	}

}

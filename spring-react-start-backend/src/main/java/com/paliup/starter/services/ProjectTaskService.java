package com.paliup.starter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.exceptions.ProjectNotFoundException;
import com.paliup.starter.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	@Autowired
	private ProjectService projectService;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		Project project = projectService.findProjetByIdentifier(projectIdentifier);
		Backlog backlog = project.getBacklog();
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
			projectTask.setStatus("TO_DO");
		}
		
		return projectTaskRepository.save(projectTask);
	}

	public Iterable<ProjectTask> findBacklogById(String backlogId) {
		projectService.findProjetByIdentifier(backlogId);
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
	}
	
	public ProjectTask findProjectTaskByProjectSequence(String backlogId, String sequenceId) {
		projectService.findProjetByIdentifier(backlogId);
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequenceId);
		if (projectTask == null) {
			throw new ProjectNotFoundException("Project Task '" + sequenceId + "' not found");
		}
		if (!projectTask.getProjectIdentifier().equals(backlogId)) {
			throw new ProjectNotFoundException("Project Task '" + sequenceId + "' does not exist in project: '" + backlogId + "'");
		}
		return projectTask;
	}
	
	public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String sequenceId) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(backlogId, sequenceId);
		projectTask = updatedTask;
		return projectTaskRepository.save(projectTask);
	}
	
	public void deleteProjectTaskByProjectSequence(String backlogId, String sequenceId) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(backlogId, sequenceId);
		projectTaskRepository.delete(projectTask);
	}

}

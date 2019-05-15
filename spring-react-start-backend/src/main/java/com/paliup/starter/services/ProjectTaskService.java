package com.paliup.starter.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.exceptions.ProjectNotFoundException;
import com.paliup.starter.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	Logger logger = LoggerFactory.getLogger(ProjectTaskService.class);
	
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
			logger.info("Project Task does not have a priority. Defaulting to 3");
			logger.debug("Project Task with sequence " + projectTask.getProjectSequence() + " does not have a priority. Defaulting to 3");
			projectTask.setPriority(3);
		}
		
		if (projectTask.getStatus() == null || projectTask.getStatus().equals("")) {
			logger.info("Project Task does not have a status. Defaulting to TO_DO");
			logger.debug("Project Task with sequence " + projectTask.getProjectSequence() + " does not have a status. Defaulting to TO_DO");
			projectTask.setStatus("TO_DO");
		}
		
		return projectTaskRepository.save(projectTask);
	}

	public Iterable<ProjectTask> findBacklogById(String backlogId) {
		projectService.findProjetByIdentifier(backlogId);
		logger.info("Find Project Tasks by Backlog Id");
		logger.debug("Find Project Tasks by Backlog Id " + backlogId);
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlogId);
	}
	
	public ProjectTask findProjectTaskByProjectSequence(String backlogId, String sequenceId) {
		projectService.findProjetByIdentifier(backlogId);
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequenceId);
		if (projectTask == null) {
			logger.warn("Project Task '" + sequenceId + "' not found");
			throw new ProjectNotFoundException("Project Task '" + sequenceId + "' not found");
		}
		if (!projectTask.getProjectIdentifier().equals(backlogId)) {
			logger.warn("Project Task '\" + sequenceId + \"' does not exist in project: '\" + backlogId + \"'");
			throw new ProjectNotFoundException("Project Task '" + sequenceId + "' does not exist in project: '" + backlogId + "'");
		}
		
		logger.info("Project Task found");
		logger.debug("Project Task by sequence " + sequenceId + " found");
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

package com.paliup.starter.web;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.services.MapValidationErrorService;
import com.paliup.starter.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
public class BacklogController {
	
	Logger logger = LoggerFactory.getLogger(BacklogController.class);

	@Autowired	
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{backlogId}")
	public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlogId) {
		logger.info("POST Request was made to '/api/backlog/backlogId' to add a new Project Task to " + backlogId);
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if (errorMap != null) return errorMap;
		
		ProjectTask projectTask1 = projectTaskService.addProjectTask(backlogId, projectTask);
		
		logger.info("Project Task created succesffully");
		return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
	}
	
	@GetMapping("/{backlogId}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlogId) {
		logger.info("GET Request was made to '/api/backlog/backlogId' to get a Backlog by " + backlogId);
		return projectTaskService.findBacklogById(backlogId);
	}
	
	@GetMapping("/{backlogId}/{projectTaskId}")
	public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
		logger.info("GET Request was made to '/api/backlog/backlogId/projectTaskId' to get a ProjectTask by " + projectTaskId);
		ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId);
		logger.info("ProjectTask found!");
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}
	
	@PatchMapping("/{backlogId}/{projectTaskId}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlogId, @PathVariable String projectTaskId) {
		logger.info("PATCH Request was made to '/api/backlog/backlogId/projectTaskId' to update a ProjectTask by " + projectTaskId);
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if (errorMap != null) return errorMap;
		ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlogId, projectTaskId);
		logger.info("ProjectTask updated!");
		return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlogId}/{projectTaskId}")
	public ResponseEntity<?> updateProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
		logger.info("Delete Request was made to '/api/backlog/backlogId/projectTaskId' to delete a ProjectTask by " + projectTaskId);
		projectTaskService.deleteProjectTaskByProjectSequence(backlogId, projectTaskId);
		logger.info("ProjectTask deleted!");
		return new ResponseEntity<String>("Project Task '" + projectTaskId + "' was deleted successfully", HttpStatus.OK);
	}
}

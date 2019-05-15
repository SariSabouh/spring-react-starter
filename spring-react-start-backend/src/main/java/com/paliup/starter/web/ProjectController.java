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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paliup.starter.domain.Project;
import com.paliup.starter.services.MapValidationErrorService;
import com.paliup.starter.services.ProjectService;

@RestController
@RequestMapping("api/project")
public class ProjectController {
	
	Logger logger = LoggerFactory.getLogger(ProjectController.class);

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {
		logger.info("POST Request was made to '/api/project' to create a new Project");
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if (errorMap != null) return errorMap;

		Project project1 = projectService.saveOrUpdateProject(project);
		logger.info("Project created succesffully");
		return new ResponseEntity<Project>(project1 , HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable String projectId) {
		logger.info("GET Request was made to '/api/project/projectId' to get Project by " + projectId);
		Project project = projectService.findProjetByIdentifier(projectId);
		logger.info("Project found");
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Project> getAllProjects() {
		logger.info("GET Request was made to '/api/project/all' to get all Projects");
		return projectService.findAllProjects();
	}
	
	@DeleteMapping("/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectId) {
		logger.info("Delete Request was made to '/api/project/projectId' to delete Project by " + projectId);
		projectService.deleteProjectByIdentifier(projectId.toUpperCase());
		logger.info("Project deleted succesffully");
		return new ResponseEntity<String>("Project with ID: '" + projectId + "' was deleted successfully", HttpStatus.OK);
	}
}

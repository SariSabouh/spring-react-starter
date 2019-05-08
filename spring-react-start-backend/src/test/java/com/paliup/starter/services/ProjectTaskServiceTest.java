package com.paliup.starter.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.exceptions.ProjectNotFoundException;
import com.paliup.starter.repositories.ProjectTaskRepository;
import com.paliup.starter.utils.TestUtils;

@RunWith(MockitoJUnitRunner.class)
public class ProjectTaskServiceTest {
	
	@Mock
	ProjectTaskRepository projectTaskRepository;
	
	@Mock
	ProjectService projectService;
	
	@InjectMocks
	ProjectTaskService projectTaskService;


	@Before
	public void setUp() {
		when(projectService.findProjetByIdentifier(any(String.class))).thenReturn(TestUtils.getTestProject());
		when(projectTaskRepository.save(any(ProjectTask.class))).thenReturn(TestUtils.getTestProjectTask());
	}

	@Test
	public void testAddProjectTask() {
		ProjectTask projectTask = new ProjectTask();
		projectTask.setSummary("Task Summary");

		ProjectTask newProjectTask = projectTaskService.addProjectTask("A", projectTask);

		assertEquals("QWERT-1", newProjectTask.getProjectSequence());
	}
	
	@Test
	public void testAddProjectTask_withPriorityNotNull() {
		ProjectTask projectTask = new ProjectTask();
		projectTask.setSummary("Task Summary");
		projectTask.setPriority(1);

		ProjectTask newProjectTask = projectTaskService.addProjectTask("A", projectTask);

		assertEquals("QWERT-1", newProjectTask.getProjectSequence());
	}
	
	@Test
	public void testAddProjectTask_withPriorityEqualsZero() {
		ProjectTask projectTask = new ProjectTask();
		projectTask.setSummary("Task Summary");
		projectTask.setPriority(0);

		ProjectTask newProjectTask = projectTaskService.addProjectTask("A", projectTask);

		assertEquals("QWERT-1", newProjectTask.getProjectSequence());
	}
	
	@Test
	public void testAddProjectTask_withStatusNotNull() {
		ProjectTask projectTask = new ProjectTask();
		projectTask.setSummary("Task Summary");
		projectTask.setStatus("TO_DO");

		ProjectTask newProjectTask = projectTaskService.addProjectTask("A", projectTask);

		assertEquals("QWERT-1", newProjectTask.getProjectSequence());
	}
	
	@Test
	public void testAddProjectTask_withStatusEqualsEmptyString() {
		ProjectTask projectTask = new ProjectTask();
		projectTask.setSummary("Task Summary");
		projectTask.setStatus("");

		ProjectTask newProjectTask = projectTaskService.addProjectTask("A", projectTask);

		assertEquals("QWERT-1", newProjectTask.getProjectSequence());
	}

	@Test
	public void testFindProjectTaskByProjectSequence() {
		ProjectTask projectTask = TestUtils.getTestProjectTask();
		when(projectTaskRepository.findByProjectSequence(any(String.class))).thenReturn(projectTask);
		ProjectTask newProjectTask = projectTaskService.findProjectTaskByProjectSequence("QWERT", "QWERT-1");
		
		assertEquals(newProjectTask.getProjectIdentifier(), projectTask.getProjectIdentifier());
		assertEquals(newProjectTask.getProjectSequence(), projectTask.getProjectSequence());
		assertEquals(newProjectTask.getId(), projectTask.getId());
	}
	
	@Test(expected = ProjectNotFoundException.class)
	public void testFindProjectTaskByProjectSequence_projectTaskNull() {
		when(projectTaskRepository.findByProjectSequence(any(String.class))).thenReturn(null);
		projectTaskService.findProjectTaskByProjectSequence("QWERT", "QWERT-1");
	}
	
	@Test(expected = ProjectNotFoundException.class)
	public void testFindProjectTaskByProjectSequence_projectBacklogNotMatch() {
		when(projectTaskRepository.findByProjectSequence(any(String.class))).thenReturn(TestUtils.getTestProjectTask());
		projectTaskService.findProjectTaskByProjectSequence("QWERTQ", "QWERT-1");
	}

}

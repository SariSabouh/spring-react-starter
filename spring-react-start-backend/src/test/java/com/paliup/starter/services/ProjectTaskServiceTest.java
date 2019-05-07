package com.paliup.starter.services;

import static org.junit.Assert.fail;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.repositories.ProjectTaskRepository;

@RunWith(MockitoJUnitRunner.class)
@DataJpaTest
public class ProjectTaskServiceTest {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Mock
	ProjectTaskRepository projectTaskRepository;
	
	@Spy
	ProjectService projectService;
	
	@InjectMocks
	ProjectTaskService projectTaskService;

	@Before
	public void setUp() throws Exception {
		
	}

	@Test
	public void testAddProjectTask() {
		projectTaskService.addProjectTask("A", new ProjectTask());
		fail("Not yet implemented");
	}

	@Test
	public void testFindBacklogById() {
		fail("Not yet implemented");
	}

	@Test
	public void testFindProjectTaskByProjectSequence() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateByProjectSequence() {
		fail("Not yet implemented");
	}

	@Test
	public void testDeleteProjectTaskByProjectSequence() {
		fail("Not yet implemented");
	}

}

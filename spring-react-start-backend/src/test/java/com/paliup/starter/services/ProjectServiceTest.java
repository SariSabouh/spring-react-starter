package com.paliup.starter.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.User;
import com.paliup.starter.exceptions.ProjectIdException;
import com.paliup.starter.exceptions.ProjectNotFoundException;
import com.paliup.starter.repositories.BacklogRepository;
import com.paliup.starter.repositories.ProjectRepository;
import com.paliup.starter.repositories.UserRepository;
import com.paliup.starter.utils.TestUtils;

@RunWith(MockitoJUnitRunner.class)
public class ProjectServiceTest {
	
	@Mock
	ProjectRepository projectRepository;
	
	@Mock
	UserRepository userRepository;
	
	@Mock
	BacklogRepository backlogRepository;
	
	@InjectMocks
	ProjectService projectService;

	@Before
	public void setUp() {
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(SecurityContextHolder.getContext().getAuthentication().getName()).thenReturn("a@a.com");
	}

	@Test
	public void testSaveNewProject() {
		Project project = TestUtils.getTestProject();
		Project newProject = TestUtils.getTestProject();
		
		when(userRepository.findByUsername("a@a.com")).thenReturn(TestUtils.getTestUser());
		when(projectRepository.save(any(Project.class))).thenReturn(newProject);

		newProject = projectService.saveOrUpdateProject(project);
		
		
		assertEquals(project.getProjectIdentifier(), newProject.getProjectIdentifier());
		assertEquals(project.getProjectLeader(), newProject.getProjectLeader());
		assertEquals(project.getProjectName(), newProject.getProjectName());
	}
	
	@Test
	public void testUpdateProject() {
		Project project = TestUtils.getTestProject();
		project.setId(Long.parseLong("1"));

		Project newProject = TestUtils.getTestProject();
		Backlog backlog = new Backlog();
		backlog.setProject(project);
		backlog.setProjectIdentifier("QWERT");
		
		when(userRepository.findByUsername("a@a.com")).thenReturn(TestUtils.getTestUser());
		when(projectRepository.findByProjectIdentifier("QWERT")).thenReturn(project);
		when(backlogRepository.findByProjectIdentifier("QWERT")).thenReturn(backlog);
		when(projectRepository.save(any(Project.class))).thenReturn(newProject);

		newProject = projectService.saveOrUpdateProject(project);
		
		
		assertEquals(project.getProjectIdentifier(), newProject.getProjectIdentifier());
		assertEquals(project.getProjectLeader(), newProject.getProjectLeader());
		assertEquals(project.getProjectName(), newProject.getProjectName());
		assertTrue(newProject.getBacklog() == null);
		assertTrue(project.getBacklog() != null);
	}
	
	@Test(expected = ProjectNotFoundException.class)
	public void testUpdateProjectWithDifferentIds_noExistingProject() {
		Project project = TestUtils.getTestProject();
		project.setId(Long.parseLong("1"));
		
		Project newProject = TestUtils.getTestProject();
		newProject.setId(Long.parseLong("2"));
		newProject.setUser(TestUtils.getTestUser());

		when(userRepository.findByUsername("a@a.com")).thenReturn(TestUtils.getTestUser());
		when(projectRepository.findByProjectIdentifier("QWERT")).thenReturn(newProject);

		projectService.saveOrUpdateProject(project);
	}
	
	@Test(expected = ProjectNotFoundException.class)
	public void testUpdateProjectWithDifferentUsernames_noExistingProject() {
		Project project = TestUtils.getTestProject();
		project.setId(Long.parseLong("1"));
		
		Project newProject = TestUtils.getTestProject();
		newProject.setId(Long.parseLong("2"));
		User user = TestUtils.getTestUser();
		user.setUsername("aa@a.com");
		newProject.setUser(user);

		when(userRepository.findByUsername("a@a.com")).thenReturn(TestUtils.getTestUser());
		when(projectRepository.findByProjectIdentifier("QWERT")).thenReturn(newProject);

		projectService.saveOrUpdateProject(project);
	}
	
	@Test(expected = ProjectIdException.class)
	public void testSaveProjectDuplicate_projectExists() {
		Project project = TestUtils.getTestProject();
		
		when(userRepository.findByUsername("a@a.com")).thenReturn(TestUtils.getTestUser());
		when(projectRepository.save(any(Project.class)))
			.thenThrow(new ProjectIdException("Username already exists"));
		
		projectService.saveOrUpdateProject(project);
	}

	@Test
	public void testFindProjetByIdentifier() {
		when(projectRepository.findByProjectIdentifier("QWERT")).thenReturn(TestUtils.getTestProject());
		Project project = projectService.findProjetByIdentifier("QWERT");
		
		assertEquals("QWERT", project.getProjectIdentifier());
		assertEquals("a@a.com", project.getProjectLeader());
		assertEquals("Test Project", project.getProjectName());
	}
	
	@Test(expected = ProjectNotFoundException.class)
	public void testFindProjetByIdentifier_projectNotFound() {
		when(projectRepository.findByProjectIdentifier("QWERT")).thenReturn(null);
		projectService.findProjetByIdentifier("QWERT");
	}
	
	@Test(expected = ProjectNotFoundException.class)
	public void testFindProjetByIdentifier_projectLeaderNotAuth() {
		Project project = TestUtils.getTestProject();
		project.setProjectLeader("aa@a.com");

		when(projectRepository.findByProjectIdentifier("QWERT")).thenReturn(project);
		projectService.findProjetByIdentifier("QWERT");
	}

	@Test
	public void testFindAllProjects() {
		Iterable<Project> projects = projectService.findAllProjects();
		assertFalse(projects.iterator().hasNext());
	}

}

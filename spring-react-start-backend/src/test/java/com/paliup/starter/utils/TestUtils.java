package com.paliup.starter.utils;

import com.paliup.starter.domain.Backlog;
import com.paliup.starter.domain.Project;
import com.paliup.starter.domain.ProjectTask;
import com.paliup.starter.domain.User;

public class TestUtils {
	
	public static User getTestUser() {
		User user = new User();
		user.setUsername("a@a.com");
		user.setPassword("qwe123");
		user.setFullName("Test User");
		
		return user;
	}
	
	public static Project getTestProject() {
		Project project = new Project();
		project.setProjectName("Test Project");
		project.setProjectLeader("a@a.com");
		project.setProjectIdentifier("QWERT");
		project.setBacklog(getTestBacklog(project));
		
		return project;
	}
	
	public static Backlog getTestBacklog(Project project) {
		Backlog backlog = new Backlog();
		backlog.setId(Long.parseLong("1"));
		backlog.setProject(project);
		backlog.setProjectIdentifier("QWERT");
		
		return backlog;
	}
	
	public static ProjectTask getTestProjectTask() {
		ProjectTask projectTask = new ProjectTask();
		projectTask.setProjectSequence("QWERT-1");
		projectTask.setSummary("Task Summary");
		projectTask.setStatus("TO_DO");
		projectTask.setPriority(3);
		projectTask.setProjectIdentifier("QWERT");
		return projectTask;
	}

}

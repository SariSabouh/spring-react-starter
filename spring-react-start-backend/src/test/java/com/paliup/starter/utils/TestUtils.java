package com.paliup.starter.utils;

import com.paliup.starter.domain.Project;
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
		
		return project;
	}

}

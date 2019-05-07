package com.paliup.starter.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.paliup.starter.domain.User;
import com.paliup.starter.exceptions.UsernameAlreadyExistsException;
import com.paliup.starter.repositories.UserRepository;

@RunWith(MockitoJUnitRunner.Silent.class)
public class UserServiceTest {
	
	@Mock
	UserRepository userRepository;
	
	@Spy
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@InjectMocks
	UserService userSerivce;
	
	private User user;
	private User newUser;
	
	@Before
	public void setUp() {
		user = new User();
		user.setFullName("Test User");
		user.setUsername("a@a.com");
		user.setPassword("qwe123");
		
		newUser = new User();
		newUser.setFullName("Test User");
		newUser.setUsername("a@a.com");
		newUser.setPassword("qwe123");
		when(userRepository.save(any(User.class))).thenReturn(newUser);
	}

	@Test
	public void testSaveUser() {
		newUser = userSerivce.saveUser(user);
		
		assertEquals(newUser.getFullName(), user.getFullName());
		assertEquals(newUser.getUsername(), user.getUsername());
		assertTrue(bCryptPasswordEncoder.matches(newUser.getPassword(), user.getPassword()));
	}
	
	@Test(expected = UsernameAlreadyExistsException.class)
	public void testSaveUser_UserExists() {
		newUser = userSerivce.saveUser(user);

		User duplicateUser = new User();
		duplicateUser.setFullName("Test User");
		duplicateUser.setUsername("a@a.com");
		duplicateUser.setPassword("qwe123");
		
		when(userRepository.save(duplicateUser))
			.thenThrow(new UsernameAlreadyExistsException("Username already exists"));
		duplicateUser = userSerivce.saveUser(duplicateUser);
	}

}

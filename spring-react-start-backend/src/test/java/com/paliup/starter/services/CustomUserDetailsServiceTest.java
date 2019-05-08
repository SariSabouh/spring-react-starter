package com.paliup.starter.services;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.paliup.starter.domain.User;
import com.paliup.starter.repositories.UserRepository;

@RunWith(MockitoJUnitRunner.Silent.class)
public class CustomUserDetailsServiceTest {
	
	@Mock
	UserRepository userRepository;
	
	@InjectMocks
	CustomUserDetailsService customUserDetailsService;

	@Test
	public void testLoadUserByUsername() {
		when(userRepository.findByUsername("a@a.com")).thenReturn(new User());
		UserDetails user = customUserDetailsService.loadUserByUsername("a@a.com");
		
		assertNotNull(user);
	}
	
	@Test(expected = UsernameNotFoundException.class)
	public void testLoadUserByUsername_userNotFound() {
		when(userRepository.findByUsername("a@a.com")).thenReturn(null);
		customUserDetailsService.loadUserByUsername("aa@a.com");
	}

	@Test
	public void testLoadUserById() {
		when(userRepository.getById(Long.parseLong("1"))).thenReturn(new User());
		UserDetails user = customUserDetailsService.loadUserById(Long.parseLong("1"));
		
		assertNotNull(user);
	}
	
	@Test(expected = UsernameNotFoundException.class)
	public void testLoadUserById_userNotFound() {
		when(userRepository.getById(Long.parseLong("1"))).thenReturn(null);
		UserDetails user = customUserDetailsService.loadUserById(Long.parseLong("2"));
		
		assertNotNull(user);
	}

}

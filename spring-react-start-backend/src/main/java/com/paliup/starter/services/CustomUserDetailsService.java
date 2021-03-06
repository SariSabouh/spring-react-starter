package com.paliup.starter.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.paliup.starter.domain.User;
import com.paliup.starter.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			logger.warn("User not found");
			throw new UsernameNotFoundException("User not found");
		}
		logger.info("User found");
		logger.debug("User " + username + " found");
		return user;
	}
	
	@Transactional
	public User loadUserById(Long id) {
		User user = userRepository.getById(id);
		if (user == null) {
			logger.warn("User not found");
			throw new UsernameNotFoundException("User not found");
		}
		logger.info("User found");
		logger.debug("User " + id + " found");
		return user;
	}

}

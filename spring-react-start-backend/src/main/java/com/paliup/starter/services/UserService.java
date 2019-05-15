package com.paliup.starter.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.User;
import com.paliup.starter.exceptions.UsernameAlreadyExistsException;
import com.paliup.starter.repositories.UserRepository;

@Service
public class UserService {
	
	Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			logger.info("Password encrypted");
			newUser.setConfirmPassword("");
			logger.info("User to be saved");
			logger.debug("User " + newUser.getUsername() + " to be saved");
			return userRepository.save(newUser);
		} catch(Exception ex) {
			logger.warn("Username '" + newUser.getUsername() + "' already exists!");
			throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists!");
		}
	}
}

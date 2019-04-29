package com.paliup.starter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.paliup.starter.domain.User;
import com.paliup.starter.exceptions.UsernameAlreadyExistsException;
import com.paliup.starter.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		try {
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);
		} catch(Exception ex) {
			throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists!");
		}
	}
}

package com.paliup.starter.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paliup.starter.domain.User;
import com.paliup.starter.services.MapValidationErrorService;
import com.paliup.starter.services.UserService;
import com.paliup.starter.validator.UserValidator;

@RestController
@RequestMapping("api/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private UserValidator userValidator;

	@PostMapping("/register")
	public ResponseEntity<?> createregisterUser(@Valid @RequestBody User user, BindingResult result) {
		userValidator.validate(user, result);

		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if (errorMap != null) return errorMap;

		User newUser = userService.saveUser(user);
		return new ResponseEntity<User>(newUser , HttpStatus.CREATED);
	}

}

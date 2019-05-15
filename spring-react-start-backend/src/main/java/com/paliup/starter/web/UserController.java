package com.paliup.starter.web;

import static com.paliup.starter.security.SecurityConstants.TOKEN_PREFIX;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paliup.starter.domain.User;
import com.paliup.starter.payload.JWTLoginSuccessResponse;
import com.paliup.starter.payload.LoginRequest;
import com.paliup.starter.security.JwtTokenProvider;
import com.paliup.starter.services.MapValidationErrorService;
import com.paliup.starter.services.UserService;
import com.paliup.starter.validator.UserValidator;

@RestController
@RequestMapping("api/users")
public class UserController {
	
	Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private UserValidator userValidator;
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
		logger.info("POST Request was made to '/api/users/register' to register new user");
		userValidator.validate(user, result);

		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if (errorMap != null) return errorMap;

		User newUser = userService.saveUser(user);
		logger.info("User registered succesffully");
		return new ResponseEntity<User>(newUser , HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
		logger.info("POST Request was made to '/api/users/login' to authenticate user");
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if (errorMap != null) return errorMap;
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
		
		logger.info("User authenticated succesffully");
		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
	}

}

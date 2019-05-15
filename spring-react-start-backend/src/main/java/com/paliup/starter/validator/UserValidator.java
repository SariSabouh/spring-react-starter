package com.paliup.starter.validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.paliup.starter.domain.User;

@Component
public class UserValidator implements Validator {
	
	Logger logger = LoggerFactory.getLogger(UserValidator.class);

	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		User user = (User)  target;
		if (user.getPassword().length() < 6) {
			logger.warn("Password is less than 6 characters");
			errors.rejectValue("password", "Length", "Password must be at least 6 characters");
		}
		
		if (!user.getPassword().equals(user.getConfirmPassword())) {
			logger.warn("Password and confirm password must match");
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
	}

}

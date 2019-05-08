package com.paliup.starter.validator;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.springframework.validation.DirectFieldBindingResult;
import org.springframework.validation.Errors;

import com.paliup.starter.domain.User;
import com.paliup.starter.utils.TestUtils;

public class UserValidatorTest {
	
	UserValidator userValidator = new UserValidator();

	@Test
	public void testSupports() {
		assertTrue(userValidator.supports(User.class));
	}

	@Test
	public void testValidate() {
		User user = TestUtils.getTestUser();
		user.setConfirmPassword("qwe123");
		Errors errors = new DirectFieldBindingResult(user, "User");
		userValidator.validate((Object) user, errors);
		assertEquals(0, errors.getFieldErrorCount());
	}
	
	@Test
	public void testValidate_shortPassword() {
		User user = TestUtils.getTestUser();
		user.setConfirmPassword("qwe12");
		user.setPassword("qwe12");
		Errors errors = new DirectFieldBindingResult(user, "User");
		userValidator.validate((Object) user, errors);
		assertEquals(1, errors.getFieldErrorCount());
	}
	
	@Test
	public void testValidate_confirmPassword() {
		User user = TestUtils.getTestUser();
		user.setConfirmPassword("qwe12qq");
		Errors errors = new DirectFieldBindingResult(user, "User");
		userValidator.validate((Object) user, errors);
		assertEquals(1, errors.getFieldErrorCount());
	}
	
	@Test
	public void testValidate_bothErrors() {
		User user = TestUtils.getTestUser();
		user.setPassword("qwe12");
		user.setConfirmPassword("qwe12qq");
		Errors errors = new DirectFieldBindingResult(user, "User");
		userValidator.validate((Object) user, errors);
		assertEquals(2, errors.getFieldErrorCount());
	}

}

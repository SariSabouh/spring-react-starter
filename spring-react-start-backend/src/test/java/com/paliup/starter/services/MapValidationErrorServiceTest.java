package com.paliup.starter.services;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@RunWith(MockitoJUnitRunner.class)
public class MapValidationErrorServiceTest {
	
	@Mock
	BindingResult results;
	
	@InjectMocks
	MapValidationErrorService mapValidationErrorService;

	@Test
	public void testMapValidationService_noErrors() {
		when(results.hasErrors()).thenReturn(false);
		ResponseEntity<?> validation = mapValidationErrorService.mapValidationService(results);
		assertNull(validation);
	}
	
	@Test
	public void testMapValidationService_hasErrors() {
		List<FieldError> fieldErrors = new ArrayList<>();
		FieldError fieldError = new FieldError("username", "username", "Message");
		fieldErrors.add(fieldError);

		when(results.hasErrors()).thenReturn(true);
		when(results.getFieldErrors()).thenReturn(fieldErrors);

		ResponseEntity<?> validation = mapValidationErrorService.mapValidationService(results);
		assertNotNull(validation);
	}

}

package com.paliup.starter.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameAlreadyExistsException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 155852846636745985L;

	public UsernameAlreadyExistsException(String message) {
		super(message);
	}

	
}

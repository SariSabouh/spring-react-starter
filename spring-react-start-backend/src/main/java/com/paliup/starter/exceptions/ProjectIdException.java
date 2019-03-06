package com.paliup.starter.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectIdException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6979205914062791377L;

	public ProjectIdException(String message) {
		super(message);
	}

}

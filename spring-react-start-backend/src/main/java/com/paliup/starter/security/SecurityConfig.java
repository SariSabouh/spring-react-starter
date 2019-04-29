package com.paliup.starter.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()  // TODO Look into re-enabling this and if we need it
			.exceptionHandling() // Used to define exception handling
			.authenticationEntryPoint(unauthorizedHandler) // This handles what is thrown when someone tries to enter not authenticated
			.and()
			.sessionManagement() // This line and below means that the server doesn't hold a session The site is stateless
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // TODO Do we need it (Redux should be good enough?)
			.and()
			.authorizeRequests() // This and the below allows these endpoints to be accessible without having to be authenticated
			.antMatchers("/",
				"/favicon.ico",
				"/**/*.png",
				"/**/*.gif",
				"/**/*.svg",
				"/**/*.jpg",
				"/**/*.html",
				"/**/*.css",
				"/**/*.js"
			).permitAll() // TODO this may be something beneficial. Format better when completed and remove if unused
			.antMatchers("/api/users/**").permitAll() // TODO TEMPORARY
			.anyRequest().authenticated(); // This means that any other request besdies the permitted ones above need to be authenticated
	}

}

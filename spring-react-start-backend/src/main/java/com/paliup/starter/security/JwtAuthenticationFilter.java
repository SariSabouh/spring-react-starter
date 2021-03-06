package com.paliup.starter.security;

import static com.paliup.starter.security.SecurityConstants.HEADER_STRING;
import static com.paliup.starter.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.paliup.starter.domain.User;
import com.paliup.starter.services.CustomUserDetailsService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	
	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader(HEADER_STRING);
		
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
			logger.info("Found Bearer Token");
			logger.debug("Bearer Token: " + bearerToken);
			return bearerToken.substring(7);
		}
		
		return null;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt = getJwtFromRequest(request);
			
			if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
				Long userId = tokenProvider.getUserIdFromJWT(jwt);
				User userDetals = customUserDetailsService.loadUserById(userId);
				
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetals, null, Collections.emptyList());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
				logger.info("User " + userId + " authenticated");
			}
		} catch(Exception ex) {
			logger.error("Could not set user authenitcation in security context");
		}
		
		filterChain.doFilter(request, response);
	}

}

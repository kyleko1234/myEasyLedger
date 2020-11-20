package com.easyledger.api.security;

import java.util.Date;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
	
	@Autowired
	private PersonRepository personRepo;
	
	@Value("${app.jwtSecret}")
	private String jwtSecret;
	
	@Value("${app.accessTokenExpirationInMs}")
	private int accessTokenExpirationInMs;
	
	@Value("${app.refreshTokenExpirationInMs}")
	private int refreshTokenExpirationInMs;
	
	public String generateAccessToken(Authentication authentication) {
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + accessTokenExpirationInMs);
		
		return Jwts.builder()
				.setSubject(Long.toString(userPrincipal.getId()))
				.claim("organizations", userPrincipal.getOrganizations())
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	public String generateRefreshToken(Authentication authentication) {
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + refreshTokenExpirationInMs);
		
		return Jwts.builder()
				.setSubject(Long.toString(userPrincipal.getId()))
				.claim("organizations", userPrincipal.getOrganizations())
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	public Long getUserIdFromJWT(String token) {
		Claims claims = Jwts.parser()
			.setSigningKey(jwtSecret)
			.parseClaimsJws(token)
			.getBody();
		return Long.parseLong(claims.getSubject());
	}
	
	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException ex) {
			logger.error("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			logger.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			logger.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			logger.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			logger.error("JWT claims string is empty.");
		}	
		return false;
	}
}

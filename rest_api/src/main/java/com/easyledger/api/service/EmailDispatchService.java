package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.easyledger.api.mail.EmailServiceImpl;

public class EmailDispatchService {
	
	@Value("${app.frontendUrl}")
	private String frontendUrl;
	
    @Autowired 
    EmailServiceImpl emailService;

	public EmailDispatchService(EmailServiceImpl emailService) {
		super();
		this.emailService = emailService;
	}


}

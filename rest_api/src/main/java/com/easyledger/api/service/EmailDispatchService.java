package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.easyledger.api.mail.EmailServiceImpl;

@Service
public class EmailDispatchService {
	
	@Value("${app.frontendUrl}")
	private String frontendUrl;
	
    @Autowired 
    EmailServiceImpl emailService;

	public EmailDispatchService(EmailServiceImpl emailService) {
		super();
		this.emailService = emailService;
	}

	public void sendVerificationMail(String to, String firstName, String lastName, String token, String locale) {
		String message;
		switch (locale) {
			case "zh-TW":
				break;
			case "en-US":
			default: 
				break;
		}
	}
	
	public void sendPasswordResetEmail(String to, String firstName, String lastName, String token, String locale) {
		String message;
		switch (locale) {
			case "zh-TW":
				break;
			case "en-US":
			default: 
				break;
		}
	}

}

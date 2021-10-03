package com.easyledger.api.mail;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Component
public class EmailServiceImpl {
	private static final String FROM_ADDRESS = "noreply@easyledgerapp.com";
	
	@Autowired
	private JavaMailSender emailSender;
	
	@Autowired
	private SpringTemplateEngine thymeleafTemplateEngine;
	
	
	public void sendSimpleMessage(String to, String subject, String text) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(FROM_ADDRESS);
			message.setTo(to);
			message.setSubject(subject);
			message.setText(text);
			emailSender.send(message);
		} catch (MailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment) {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);
			
			helper.setFrom(FROM_ADDRESS);
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(text);
			
			FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
			helper.addAttachment("fileName", file);
			
			emailSender.send(message); //TODO: catch a MailException?
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void sendHtmlMessage(String to, String subject, String htmlBody) throws MessagingException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setTo(to);;
		helper.setSubject(subject);
		helper.setText(htmlBody, true);
		emailSender.send(message);
	}
	
	public void sendMessageUsingThymeleafTemplate(String to, String subject, Map<String, Object> templateModel, String templateName) throws MessagingException {
		Context thymeleafContext = new Context();
		thymeleafContext.setVariables(templateModel);
		String htmlBody = thymeleafTemplateEngine.process(templateName, thymeleafContext);
		
		sendHtmlMessage(to, subject, htmlBody);
	}
}

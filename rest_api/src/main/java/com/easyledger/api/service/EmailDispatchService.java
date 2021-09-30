package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
		String subject;
		String message;
		switch (locale) {
			case "zh-TW":
				message = 
						"<!DOCTYPE html> "
						+ "<html> "
						+ "  <head> "
						+ "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /> "
						+ "  </head> "
						+ "  <body> "
						+ "    <p>你好 " + firstName + lastName + "，</p> "
						+ "    <p>歡迎來到 myEasyLedger。</p> "
						+ "    <p>請點擊以下連結來起動你的新帳戶：</p> "
						+ "    <a href=\"https://www.myeasyledger.com/verification/" + token + "\">https://www.myeasyledger.com/verification/" + token + "</a> "
						+ "    <p>如果點擊上述連結無效，你可以試著拷貝連結貼進你的瀏覽器的視窗中。</p> "
						+ "    <p> "
						+ "      <em>本電郵是來自系統的自動回覆，請不要直接回覆本電郵。</em> "
						+ "    </p> "
						+ "  </body> "
						+ "</html>";
				subject = "myEasyLedger 帳戶確認信";
				break;
			case "en-US":
			default: 
				message = 
						"<!DOCTYPE html> "
						+ "<html> "
						+ "  <head> "
						+ "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /> "
						+ "  </head> "
						+ "  <body> "
						+ "    <p>Hello " + firstName + " " + lastName + ",</p> "
						+ "    <p>Welcome to myEasyLedger.</p> "
						+ "    <p>Please click the following URL to activate your account:</p> "
						+ "    <a href=\"https://www.myeasyledger.com/verification/" + token + "\">https://www.myeasyledger.com/verification/" + token + "</a> "
						+ "    <p>If clicking the URL above does not work, copy and paste the URL into a browser window.</p> "
						+ "    <p> "
						+ "      <em>This is an automated email, please do not reply directly to this email.</em> "
						+ "    </p> "
						+ "  </body> "
						+ "</html>";
				subject = "myEasyLedger Account Verification";
				break;
		}
	}
	
	public void sendPasswordResetEmail(String to, String firstName, String lastName, String token, String locale) {
		String subject;
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

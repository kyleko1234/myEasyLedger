package com.easyledger.api.service;

import javax.mail.MessagingException;

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

	public void sendVerificationMail(String to, String firstName, String lastName, String token, String locale) throws MessagingException {
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
						+ "    <p>你好 " + lastName +"，</p> "
						+ "    <p>歡迎來到 myEasyLedger。</p> "
						+ "    <p>請點擊以下連結來起動你的新帳戶：</p> "
						+ "    <a href=\"" + frontendUrl + "/verification/" + token + "/" + locale + "\">" + frontendUrl + "/verification/" + token + "/" + locale + "</a> "
						+ "    <p>如果點擊上述連結無效，你可以試著拷貝該連結，將它貼進你的瀏覽器的視窗中。</p> "
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
						+ "    <p>Hello " + firstName + ",</p> "
						+ "    <p>Welcome to myEasyLedger.</p> "
						+ "    <p>Please click on the following link to activate your account:</p> "
						+ "    <a href=\"" + frontendUrl + "/verification/" + token + "/" + locale + "\">" + frontendUrl + "/verification/" + token + "/" + locale + "</a> "
						+ "    <p>If clicking on the link above does not work, copy and paste the link into a browser window.</p> "
						+ "    <p> "
						+ "      <em>This is an automated message; please do not reply directly to this email.</em> "
						+ "    </p> "
						+ "  </body> "
						+ "</html>";
				subject = "myEasyLedger Account Verification";
				break;
		}
		emailService.sendHtmlMessage(to, subject, message);
	}
	
	public void sendPasswordResetEmail(String to, String firstName, String lastName, String token, String locale) throws MessagingException {
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
						+ "    <p>你好 " + lastName + "，</p> "
						+ "    <p>我們有收到你要重設密碼的請求。你重設密碼時需要打入的「確認碼」是：</p> "
						+ "    <h1>" + token + "</h1> "
						+ "    <p>這個確認碼會在本電郵送達的15分鐘後自動失效。</p> "
						+ "    <p> "
						+ "      <em>本電郵是來自系統的自動回覆，請不要直接回覆本電郵。</em> <br /> "
						+ "    </p> "
						+ "  </body> "
						+ "</html>";
				subject = "你的 myEasyLedger 帳戶密碼重設「確認碼」是 " + token;
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
						+ "    <p>Hello " + firstName + ",</p> "
						+ "    <p>We received a request to reset your password to myEasyLedger. Your password reset code is below:</p> "
						+ "    <h1>" + token + "</h1> "
						+ "    <p>This code expires in 15 minutes.</p> "
						+ "    <p> "
						+ "      <em>This is an automated message; please do not reply directly to this email.</em> <br /> "
						+ "    </p> "
						+ "  </body> "
						+ "</html>";
				subject = "Your myEasyLedger password reset code is " + token;
				break;
		}
		emailService.sendHtmlMessage(to, subject, message);
	}
	
	public void sendInvitationEmail(String inviterFirstName, String inviterLastName, String organizationName, String to, String token, String locale) throws MessagingException {
		String subject;
		String message;
		switch (locale) {
			case "zh-TW":
				subject = "邀請您使用 myEasyLedger 來記帳";
				message = "<!DOCTYPE html>   "
						+ "<html>   "
						+ "    <head>   "
						+ "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /> "
						+ "    </head>   "
						+ "    <body>   "
						+ "    <p>你好，</p>   "
						+ "    <p>" + inviterFirstName + inviterLastName + "想要邀請你使用 myEasyLedger 來共用 \"" + organizationName + "\" 帳本，請點擊以下連結接受本邀請後，就能開始用你的記帳帳戶：</p>   "
						+ "    <a href=\"" + frontendUrl + "/accept-invitation/" + token + "/" + locale + "\">" + frontendUrl + "/accept-invitation/" + token + "/" + locale + "</a> "
						+ "    <p>如果因故點擊上面連結無效，你可以將該連結拷貝貼到瀏覽器視窗上試試看。</p> "
						+ "    <p>   "
						+ "        <em>註：本郵乃發自系統，故不要直接回覆此郵，因為没有人收得到。</em> <br />   "
						+ "    </p>   "
						+ "    </body>   "
						+ "</html> ";
				break;
			case "en-US":
			default:
				subject = "Invitation to myEasyLedger";
				message = "<!DOCTYPE html>   "
						+ "<html>   "
						+ "    <head>   "
						+ "    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /> "
						+ "    </head>   "
						+ "    <body>   "
						+ "    <p>Hello and welcome.</p>   "
						+ "    <p>" + inviterFirstName + " " + inviterLastName + " has invited you to myEasyLedger to collaborate on \"" + organizationName +"\". Please click on the link below to finish setting up your account.</p>   "
						+ "    <a href=\"" + frontendUrl + "/accept-invitation/" + token + "/" + locale + "\">" + frontendUrl + "/accept-invitation/" + token + "/" + locale + "</a> "
						+ "    <p>If clicking on the link above does not work, copy and paste the link into a browser window.</p> "
						+ "    <p>   "
						+ "        <em>This is an automated message; please do not reply directly to this email.</em> <br />   "
						+ "    </p>   "
						+ "    </body>   "
						+ "</html> ";
				break;
		}
		emailService.sendHtmlMessage(to, subject, message);
	}
}

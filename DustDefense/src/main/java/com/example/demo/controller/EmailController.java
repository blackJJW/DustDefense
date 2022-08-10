package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.domain.MailDTO;
import com.example.demo.service.EmailService;

@Controller
public class EmailController {

	//private final EmailService emailService;
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
//	public EmailController(EmailService emailService) {
//        this.emailService = emailService;
//    }
	@GetMapping("/mail/send")
    public String main() {
        return "user/sendMail";
    }
	
//	@PostMapping("/mail/send")
//    public String sendMail(String email) {
//        emailService.sendSimpleMessage(email);
//        logger.info("메일 전송 완료");
//        return "user/AfterMail";
//    }
	


	
}

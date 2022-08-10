package com.example.demo.service;

import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.demo.controller.UserController;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService{

	
	 
    private JavaMailSender emailSender;
 
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    public String sendSimpleMessage(String email) {
        //SimpleMailMessage message = new SimpleMailMessage();
        
        //JavaMailSenderImplclass
        //JavaMailSender 인터페이스의 구현을 제공
        //MimeMessage 및 SimpleMailMessage를 지원
        //SimpleMailMessageclass
        //발신인, 수신인, 참조인, 제목 및 텍스트 필드를 포함한 간단한 메일 메시지를 작성하는 데 사용
        //MimeMessagePreparatorinterface
        //MIME 메시지를 준비하기 위한 콜백 인터페이스를 제공
        //MimeMessageHelperclass
        //MIME 메시지를 만들기 위한 클래스
        //HTML 레이아웃에서 이미지, 일반적인 메일 첨부 파일 및 텍스트 내용을 지원
        
        /* 인증번호(난수) 생성 */
        Random random = new Random();
        int checkNum = random.nextInt(888888) + 111111;
        logger.info("인증번호 " + checkNum);
        
        
      
        /* 이메일 보내기 */
        String setFrom = "gotjd9773@naver.com";
        String toMail = email;
        String title = "회원가입 인증 이메일 입니다.";
        String content = 
              "홈페이지를 방문해주셔서 감사합니다." +
              "<br><br>" + 
              "인증 번호는 " + checkNum + "입니다." + 
              "<br>" + 
              "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
		
		 try {
		 
		 MimeMessage message = emailSender.createMimeMessage(); MimeMessageHelper
		 helper = new MimeMessageHelper(message, true, "utf-8");
		 helper.setFrom(setFrom); helper.setTo(toMail); helper.setSubject(title);
		 helper.setText(content,true); emailSender.send(message);
		 
		 }catch(Exception e) { e.printStackTrace(); }
		 
        String num = Integer.toString(checkNum);
        
        return num;
	    }
}

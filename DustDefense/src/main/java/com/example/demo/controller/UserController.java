package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.domain.PasswordQuestionCode;
import com.example.demo.domain.UserDTO;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;

@Controller
public class UserController {

	private final EmailService emailService;
	
	public UserController(EmailService emailService) {
        this.emailService = emailService;
    }
	@Autowired
	private UserService userService;
	
	@Autowired
    private JavaMailSender mailSender;
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	//회원가입 페이지 이동
	@GetMapping(value = "/user/join.do")
	public String joinGET(Model model) {
		
		logger.info("회원가입 페이지 진입");
		model.addAttribute("join", new UserDTO());
		
		return "user/join";
	}
	//회원가입
	@PostMapping(value="user/join.do")
	public String joinPOST(UserDTO user) throws Exception{
		
		logger.info("join 진입");
		
		// 회원가입 서비스 실행
		userService.memberJoin(user);
		
		logger.info("join Service 성공");
		
		return "redirect:/board/list.do";
		
	}
	//로그인 페이지 이동
	@GetMapping(value = "/user/login.do")
	public void loginGET() {
		
		logger.info("로그인 페이지 진입");
		
	}
	// 아이디 중복 검사
	@PostMapping(value = "user/userIdChk")
	@ResponseBody //이게 없으면 500번대 에러 //새로고침 없이 비동기통신을 하려면 body에 데이터를 담아줘야한다.
	public String userIdChkPOST(String id) throws Exception{
		
		logger.info("memberIdChk() 진입");
		
		int result = userService.idCheck(id);
		
		logger.info("결과값 = " + result);
		
		if(result != 0) {
			
			return "fail";	// 중복 아이디가 존재
			
		} else {
			
			return "success";	// 중복 아이디 x
			
		}	
		
	}
	// 닉네임 중복 검사
	@PostMapping(value = "user/userNicknameChk")
	@ResponseBody //이게 없으면 500번대 에러 //새로고침 없이 비동기통신을 하려면 body에 데이터를 담아줘야한다.
	public String nicknameChkPOST(String nickname) throws Exception{
		
		logger.info("nicknameChk() 진입");
		
		int result = userService.nicknameCheck(nickname);
		
		logger.info("결과값 = " + result);
		
		if(result != 0) {
			
			return "fail";	// 중복 닉네임이 존재
			
		} else {
			
			return "success";	// 중복 닉네임이 x
			
		}	
		
		
	}
	/* 이메일 인증 */
    @GetMapping(value="user/mailCheck")
    @ResponseBody//역시 비동기 통신을 위해서 필요하다
    public String mailCheckGET(String email) throws Exception{
        
        /* 뷰(View)로부터 넘어온 데이터 확인 */
        logger.info("이메일 데이터 전송 확인");
        logger.info("인증번호를 보내줄 이메일 : " + email);
        logger.info("메일 전송 완료");
        return emailService.joinEmail(email);
        
        
//        /* 인증번호(난수) 생성 */
//        Random random = new Random();
//        int checkNum = random.nextInt(888888) + 111111;
//        logger.info("인증번호 " + checkNum);
//        
//        /* 이메일 보내기 */
//        String setFrom = "sjinjin6@naver.com";
//        String toMail = email;
//        String title = "회원가입 인증 이메일 입니다.";
//        String content = 
//                "홈페이지를 방문해주셔서 감사합니다." +
//                "<br><br>" + 
//                "인증 번호는 " + checkNum + "입니다." + 
//                "<br>" + 
//                "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
//        
//        try {
//            
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
//            helper.setFrom(setFrom);
//            helper.setTo(toMail);
//            helper.setSubject(title);
//            helper.setText(content,true);
//            mailSender.send(message);
//            logger.info("메일 전송 완료");
//        }catch(Exception e) {
//            e.printStackTrace();
//        }
//        
//        String num = Integer.toString(checkNum);
//        return num;
        
        
        
    }
    
    /* 비밀번호 찾기 질문 코드*/
    @ModelAttribute("passwordQuestionCodes")
    public List<PasswordQuestionCode> passwordQuestionCodes() {
    	List<PasswordQuestionCode> passwordQuestionCodes = new ArrayList<>();
    	passwordQuestionCodes.add(new PasswordQuestionCode("00001","기억에 남는 추억의 장소는?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00002","자신의 인생 좌우명은?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00003","자신의 보물 제 1호는?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00004","가장 기억에 남는 선생님 성함은?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00005","추억하고 싶은 날짜는?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00006","받았던 선물 중 기억에 남는 독특한 선물은?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00007","학창시절 가장 생각나는 친구 이름은?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00008","인상 깊게 읽은 책 제목은?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00009","존경하는 인물은?"));
    	passwordQuestionCodes.add(new PasswordQuestionCode("00010","좋아하는 캐릭터는?"));
    	return passwordQuestionCodes;
    }
    
}

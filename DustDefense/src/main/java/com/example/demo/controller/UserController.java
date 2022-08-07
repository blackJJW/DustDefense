package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.domain.BoardDTO;
import com.example.demo.domain.UserDTO;
import com.example.demo.service.UserService;

@Controller
public class UserController {

	@Autowired
	private UserService userService;
	
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
}
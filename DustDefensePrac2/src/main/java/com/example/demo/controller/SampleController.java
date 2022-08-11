package com.example.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.security.dto.ClubAuthMemberDTO;

import lombok.extern.log4j.Log4j2;

@Controller
@Log4j2
@RequestMapping("/sample/")
public class SampleController {
	
	/*
	 * 현재 사용자의 권한에 따라 접근할 수 있는 경로를 지정
	 * 로그인을 하지 않은 사용자도 접근할 수 있는 '/sample/all' 
	 * 로그인한 사용자만 접근할 수 있는 '/sample/member'
	 * 관리자(admin) 권한이 있는 사용자만 접근할 수 있는 '/sample/admin'
	 * */
	
	@GetMapping("/all")
	public void exAll() {
		log.info("exAll..........");
	}
	
	@GetMapping("/member")
	public void exMember(@AuthenticationPrincipal ClubAuthMemberDTO clubAuthMember) {
		log.info("exMember..........");
		
		log.info("--------------------------------------");
		log.info(clubAuthMember);
	}
	
	@GetMapping("/admin")
	public void exAdmin() {
		log.info("exAdmin..........");
	}

}

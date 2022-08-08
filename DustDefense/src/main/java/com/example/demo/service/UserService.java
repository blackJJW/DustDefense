package com.example.demo.service;

import com.example.demo.domain.UserDTO;

public interface UserService {

	//회원가입
	public void memberJoin(UserDTO user) throws Exception;
		
	// 아이디 중복 검사
	public int idCheck(String id) throws Exception;
}

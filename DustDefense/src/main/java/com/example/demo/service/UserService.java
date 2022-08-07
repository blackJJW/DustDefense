package com.example.demo.service;

import com.example.demo.domain.UserDTO;

public interface UserService {

	//회원가입
		public void memberJoin(UserDTO user) throws Exception;
}

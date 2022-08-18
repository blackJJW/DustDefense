package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.domain.UserDTO;

@Mapper
public interface UserMapper {

	//회원가입
	public void memberJoin(UserDTO user);
	
	// 아이디 중복 검사
	public int idCheck(String id);
	
	// 닉네임 중복 검사
	public int nicknameCheck(String nickname);
	
	//마이페이지
	public UserDTO readMember(String id);
}

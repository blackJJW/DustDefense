package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.domain.UserDTO;
import com.example.demo.mapper.UserMapper;

@SpringBootTest
public class UserMapperTests {

	@Autowired
	private UserMapper userMapper;
	
	@Test
	public void memberJoin() throws Exception{
		UserDTO member = new UserDTO();
		
		member.setId("test");			
		member.setName("test");			
		member.setAuthorityType("0");		
		member.setNickname("test");		
		member.setEmail("test");		
		member.setPassword("test");		
		//member.setSignupDate("test");		
		member.setPasswordQuestionCode("cd");		
		member.setPasswordQuestionAnswer("test");		
		member.setValidMember("N");		
		
		userMapper.memberJoin(member);			//쿼리 메서드 실행
		
	}
}

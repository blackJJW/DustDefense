package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.UserDTO;
import com.example.demo.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserMapper userMapper;

	@Override
	public void memberJoin(UserDTO user) throws Exception {
		
		userMapper.memberJoin(user);
		
	}
	@Override
	public int idCheck(String id) throws Exception {
		// TODO Auto-generated method stub
		return userMapper.idCheck(id);
	}

	@Override
	public int nicknameCheck(String nickname) throws Exception {
		// TODO Auto-generated method stub
		return userMapper.nicknameCheck(nickname);
	}
	// 마이페이지 회원정보보기
	@Override
	public UserDTO readMember(String id) {
		
		System.out.println("S : readMember()실행");
		UserDTO user = null;
		
		try {
			user = userMapper.readMember(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return user;
		
	}
}

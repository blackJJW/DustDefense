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

	
	

}

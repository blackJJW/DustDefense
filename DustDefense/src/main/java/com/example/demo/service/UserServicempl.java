package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dao.UserDao;
import com.example.demo.model.User;

public class UserServicempl implements UserService{
	@Autowired
	UserDao userDao;
	
	@Override
	public List<User> selectList(){
		return userDao.selectList();
	}
}

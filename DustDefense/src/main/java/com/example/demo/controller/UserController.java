package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.UserDao;
import com.example.demo.model.User;

@RestController
public class UserController {
	@Autowired
	UserDao userDao;
	
	@GetMapping("/main")
	public List<User> main(){
		List<User> list = userDao.selectList();
		return list;
	}
}

package com.example.demo.security;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.entity.TbUser;
import com.example.demo.entity.TbUserRole;
import com.example.demo.repository.TbUserRepository;

@SpringBootTest
public class TbUserTests {

	@Autowired
	private TbUserRepository repository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Test
	public void insertDummies() {
		TbUser tbUser1 = TbUser.builder()
				.id("member1")
				.name("김철수")
				.email("member1Kim@gmail.com")
				.password(passwordEncoder.encode("kim12345"))
				.passwordQusestionCode("0001")
				.passwordQuestionAnswer("나도몰라")
				.nickname("멤버1철수")
				.validMember(true)
				.build();
		tbUser1.addMemberRole(TbUserRole.USER);
		
		repository.save(tbUser1);
		
		TbUser tbUser2 = TbUser.builder()
				.id("member2")
				.name("이영희")
				.email("member2Lee@gmail.com")
				.password(passwordEncoder.encode("lee12345"))
				.passwordQusestionCode("0002")
				.passwordQuestionAnswer("몰라")
				.nickname("멤버2영희")
				.validMember(true)
				.build();
		tbUser2.addMemberRole(TbUserRole.ADMIN);
		
		repository.save(tbUser2);
	}
	
	@Test
	public void testRead() {
		Optional<TbUser> result = repository.findById("member1");
		
		TbUser tbUser = result.get();
		System.out.println(tbUser);
	}
}

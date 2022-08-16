package com.example.demo;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.domain.post.PostMapper;
import com.example.demo.domain.post.PostRequest;
import com.example.demo.domain.post.PostResponse;

@SpringBootTest
public class PostMapperTest {
	@Autowired
	PostMapper postMapper;
	
	@Test
	void save() {
		
		
		List<PostResponse> posts = postMapper.findAll();
		System.out.println("전체 개수 : " + posts.size() + "개 입니다.");
	}
}

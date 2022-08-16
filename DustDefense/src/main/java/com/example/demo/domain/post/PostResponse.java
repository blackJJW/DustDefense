package com.example.demo.domain.post;

import lombok.Getter;

@Getter
public class PostResponse {
	private String id;
	private String name;
	private String nickname;
	private String email;
	private String authority_type;
	private String password;
	private String password_question_code;
	private String password_question_answer;
	private int valid_member;
}

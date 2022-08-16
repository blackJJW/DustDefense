package com.example.demo.domain.post;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequest {
	private String id;
	private String nickname;
	private String email;
	private String authority_type;
	private int valid_member;
}

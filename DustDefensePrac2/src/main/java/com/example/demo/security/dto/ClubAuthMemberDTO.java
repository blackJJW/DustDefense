package com.example.demo.security.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Getter
@Setter
@ToString
public class ClubAuthMemberDTO extends User{
	/*
	 * DTO 역할을 하는 클래스임에 동시에 스프링 시큐리티에서 인가/인증 작업에 사용 가능
	 * password는 부모 클래스를 사용하므로 별도의 멤버 변수로 선언하지 않는다. 
	 * */
	
	private String email;
	
	private String name;
	
	private boolean fromSocial;
	
	public ClubAuthMemberDTO(String username, 
							 String password,
							 boolean fromSocial,
			                 Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.email = username;
		this.fromSocial = fromSocial;
	}
}

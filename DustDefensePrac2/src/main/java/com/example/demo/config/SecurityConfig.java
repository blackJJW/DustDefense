package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.extern.log4j.Log4j2;

@Configuration
@Log4j2
public class SecurityConfig {

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http.authorizeHttpRequests((auth) -> {
			auth.antMatchers("/sample/all").permitAll();
			auth.antMatchers("sample/member").hasRole("USER");
		});
		
		http.formLogin();
		http.csrf().disable();
		http.logout();
		
		return http.build();
	}
	
	//  WebSecurityConfigurerAdapter 가 deprecated 됨
//	@Override
//	protected void configure(HttpSecurity http) throws Exception{
//		
//		http.authorizeHttpRequests()
//			.antMatchers("/sample/all").permitAll()
//			.antMatchers("/sample/member").hasRole("USER");
//		
//		http.formLogin(); // 인가, 인증에 문제 시 로그인 화면
//		http.csrf().disable(); // CSRF 토큰 발행 중지
//		http.logout(); // 로그아웃 처리
//	}
	
	// 더 이상 사용하지 않는다. 
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws
//	Exception{
//		// 사용자 계정 : user1
//		auth.inMemoryAuthentication().withUser("user1")
//		// 1111 패스워드 인코딩 결과
//		.password("$2a$10$Kc7vnz3kPUMktwrKXPP8f.Ky0ki7WEjHOdqJCAfGgTUz4mhZ3Qd0K").roles("USER");
//	}
}

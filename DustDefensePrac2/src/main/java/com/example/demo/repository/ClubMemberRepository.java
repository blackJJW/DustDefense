package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.ClubMember;

public interface ClubMemberRepository extends JpaRepository<ClubMember, String>{
	/*
	 * Club 멤버 조회시 이메일을 기준으로 조회
	 * 일반 로그인 사용자와 뒤에 추가되는 소셜 로그인 사용자를 구분하기 위해 ClubMemberRepository에
	 * 별도의 메소드로 처리
	 */
	
	@EntityGraph(attributePaths = {"roleSet"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query("select m from ClubMember m where m.fromSocial = :social and m.email =:email")
    Optional<ClubMember> findByEmail(@Param("email") String email, @Param("social") boolean social);

}

package com.example.demo.domain.post;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class PostResponse {
	
	private Long id;
	private String title;                  
    private String content;                
    private String writer;                 
    private int viewCnt;                   
    private Boolean noticeYn;              
    private Boolean deleteYn;                 
    private LocalDateTime createdDate;     
    private LocalDateTime modifiedDate;    
}

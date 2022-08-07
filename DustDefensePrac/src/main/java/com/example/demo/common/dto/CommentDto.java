package com.example.demo.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {

	private Long idx;
	private Long boardIdx;
	private String content;
	private String writer;
}

package com.example.demo.domain.comment;

import java.util.List;

import com.example.demo.common.dto.CommentDto;

public interface CommentService {

	public boolean registerComment(CommentDto params);

	public boolean deleteComment(Long idx);

	public List<CommentDto> getCommentList(CommentDto params);

}

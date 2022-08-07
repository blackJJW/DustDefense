package com.example.demo.domain.comment;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.common.dto.CommentDto;

@Mapper
public interface CommentMapper {

	public int insertComment(CommentDto params);

	public CommentDto selectCommentDetail(Long idx);

	public int updateComment(CommentDto params);

	public int deleteComment(Long idx);

	public List<CommentDto> selectCommentList(CommentDto params);

	public int selectCommentTotalCount(CommentDto params);
}

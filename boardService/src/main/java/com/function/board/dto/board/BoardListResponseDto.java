package com.function.board.dto.board;

import java.time.LocalDateTime;

import com.function.board.domain.board.Board;

import lombok.Getter;

@Getter
public class BoardListResponseDto {

	private final Long id;
	private final String content;
	private final String writer;
	private final LocalDateTime createdAt;
	private final int commentCount;
	private final int likeCount;
	private final int dislikeCount;
	private final int evaluationStatus;    // 좋아요/싫어요 평가 여부 (0: 평가 X , 1: 좋아요 , 2: 싫어요)

	public BoardListResponseDto(Board entity, int likeCount, int dislikeCount, int evaluationStatus) {
		this.id = entity.getId();
		this.content = entity.getContent();
		this.writer = entity.getWriter();
		this.createdAt = entity.getCreatedAt();
		this.commentCount = entity.getComments().size();
		this.likeCount = likeCount;
		this.dislikeCount = dislikeCount;
		this.evaluationStatus = evaluationStatus;
	}

}

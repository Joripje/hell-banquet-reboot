package com.hellsfood.dto.board;

import com.hellsfood.domain.board.Board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardSaveRequestDto {

	private String content;
	private String writer;

	@Builder
	public BoardSaveRequestDto(String content, String writer) {
		this.content = content;
		this.writer = writer;
	}

	public Board toEntity() {
		return Board.builder()
			.content(content)
			.writer(writer)
			.build();
	}
}

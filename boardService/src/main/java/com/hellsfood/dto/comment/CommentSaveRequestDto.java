package com.hellsfood.dto.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentSaveRequestDto {

	private Long boardId;
	private String content;
	private String writer;

}

package com.hellsfood.domain.comment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hellsfood.domain.BaseTimeEntity;
import com.hellsfood.domain.board.Board;
import com.hellsfood.dto.comment.CommentSaveRequestDto;
import com.hellsfood.dto.comment.CommentUpdateRequestDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "comment")
@SQLDelete(sql = "UPDATE comment SET is_deleted = true WHERE comment_id = ?")
public class Comment extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", nullable = false)
	private Board board;

	@Column(name = "author_id", nullable = false)
	private String writer;

	@Column(nullable = false)
	private String content;

	@Builder
	public Comment(Board board, CommentSaveRequestDto requestDto) {
		this.board = board;
		this.content = requestDto.getContent();
		this.writer = requestDto.getWriter();
	}

	public void update(CommentUpdateRequestDto requestDto) {
		this.content = requestDto.getContent();
	}

}

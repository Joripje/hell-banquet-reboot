package com.hellsfood.domain.board;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hellsfood.domain.BaseTimeEntity;
import com.hellsfood.domain.comment.Comment;
import com.hellsfood.dto.board.BoardUpdateRequestDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board")
@SQLDelete(sql = "UPDATE board SET is_deleted = true WHERE board_id = ?")
@Where(clause = "is_deleted = false")
public class Board extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_id")
	private Long id;

	@Column(name = "content", nullable = false)
	private String content;

	@Column(name = "author_id", nullable = false)
	private String writer;

	@JsonIgnore
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	private final List<Comment> comments = new ArrayList<>();

	@Builder
	public Board(String content, String writer) {
		this.content = content;
		this.writer = writer;
	}

	public void update(BoardUpdateRequestDto requestDto) {
		this.content = requestDto.getContent();
	}

}

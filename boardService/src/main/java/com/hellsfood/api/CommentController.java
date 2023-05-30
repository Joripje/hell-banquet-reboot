package com.hellsfood.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellsfood.dto.comment.CommentListResponseDto;
import com.hellsfood.dto.comment.CommentSaveRequestDto;
import com.hellsfood.dto.comment.CommentUpdateRequestDto;
import com.hellsfood.service.CommentService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	@ApiOperation(value = "댓글 생성")
	@PostMapping()
	public ResponseEntity<Long> createComment(@RequestBody CommentSaveRequestDto requestDto) {
		commentService.save(requestDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "댓글 상세 조회 - find by id")
	@GetMapping("/{id}")
	public ResponseEntity<CommentListResponseDto> getOneCommentById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(commentService.findById(id));
	}

	@ApiOperation(value = "댓글 수정")
	@PutMapping("/{id}")
	public ResponseEntity<Long> updateComment(@PathVariable Long id, @RequestBody CommentUpdateRequestDto requestDto) {
		return ResponseEntity.ok(commentService.update(id, requestDto));
	}

	@ApiOperation(value = "댓글 삭제")
	@DeleteMapping("/{id}")
	public void deleteComment(@PathVariable Long id) {
		commentService.delete(id);
	}

}

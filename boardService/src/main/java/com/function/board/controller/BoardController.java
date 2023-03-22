package com.function.board.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.board.domain.board.Board;
import com.function.board.dto.board.BoardListResponseDto;
import com.function.board.dto.board.BoardResponseDto;
import com.function.board.dto.board.BoardSaveRequestDto;
import com.function.board.dto.board.BoardUpdateRequestDto;
import com.function.board.dto.comment.CommentListResponseDto;
import com.function.board.service.BoardService;
import com.function.board.service.CommentService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	private final CommentService commentService;

	@ApiOperation(value = "게시글 생성")
	@PostMapping()
	public ResponseEntity<Object> save(@RequestBody BoardSaveRequestDto requestDto) {
		boardService.save(requestDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "게시글 목록 조회")
	@GetMapping("/list")
	public ResponseEntity<List<Board>> list() {
		return ResponseEntity.ok(boardService.findAll());
	}

	@ApiOperation(value = "게시글 페이징")
	@GetMapping()
	public ResponseEntity<List<BoardListResponseDto>> paging(
		@RequestParam Long lastBoardId, @RequestParam int size,
		@RequestParam(required = false) String startDate,
		@RequestParam(required = false) String endDate,
		@RequestParam String userId) {

		LocalDateTime startDateTime = startDate != null ? LocalDateTime.parse(startDate + "T00:00:00") : null;
		LocalDateTime endDateTime = endDate != null ? LocalDateTime.parse(endDate + "T23:59:59") : null;

		lastBoardId = lastBoardId == -1 ? boardService.fetchLatestBoardId() : lastBoardId;
		List<BoardListResponseDto> boardList = boardService.fetchBoardPagesByPeriod(lastBoardId, size, userId, startDateTime, endDateTime);

		return new ResponseEntity<>(boardList, HttpStatus.OK);
	}

	@ApiOperation(value = "{id}에 해당하는 게시글 조회")
	@GetMapping("/{id}")
	public ResponseEntity<BoardResponseDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(boardService.findById(id));
	}

	@ApiOperation(value = "게시글 수정")
	@PutMapping("/{id}")
	public ResponseEntity<Long> update(@PathVariable Long id, @RequestBody BoardUpdateRequestDto requestDto) {
		return ResponseEntity.ok(boardService.update(id, requestDto));
	}

	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		boardService.delete(id);
	}

	@ApiOperation(value = "{id}에 해당하는 댓글 목록 조회")
	@GetMapping("/{id}/comments")
	public ResponseEntity<List<CommentListResponseDto>> getCommentList(@PathVariable Long id) {
		List<CommentListResponseDto> comments = commentService.findByBoardId(id);
		return new ResponseEntity<>(comments, HttpStatus.OK);
	}

}

package com.hellsfood.api;

import java.util.List;
import java.util.Objects;

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

import com.hellsfood.domain.board.Board;
import com.hellsfood.dto.board.BoardListResponseDto;
import com.hellsfood.dto.board.BoardResponseDto;
import com.hellsfood.dto.board.BoardSaveRequestDto;
import com.hellsfood.dto.board.BoardUpdateRequestDto;
import com.hellsfood.service.BoardService;
import com.hellsfood.service.CommentService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
	private final CommentService commentService;

	@ApiOperation(value = "게시글 생성")
	@PostMapping()
	public ResponseEntity<Long> createBoard(@RequestBody BoardSaveRequestDto requestDto) {
		return new ResponseEntity<>(boardService.saveBoard(requestDto), HttpStatus.OK);
	}

	@ApiOperation(value = "게시글 목록 조회 - 단순 Crud 테스트를 위함")
	@GetMapping("/list")
	public ResponseEntity<List<Board>> getAllBoards() {
		return ResponseEntity.ok(boardService.findAllBoards());
	}

	@ApiOperation(value = "게시글 목록 조회 - 무한 스크롤 적용")
	@GetMapping()
	public ResponseEntity<List<BoardListResponseDto>> loadBoardsOnScroll(
		@RequestParam Long lastBoardId, @RequestParam int size, @RequestParam String userId) {
		lastBoardId = lastBoardId == -1 ? boardService.fetchLatestBoardId() + 1: lastBoardId;
		List<BoardListResponseDto> boardList = boardService.fetchBoardPagesBy(lastBoardId, size, userId);
		return new ResponseEntity<>(boardList, HttpStatus.OK);
	}

	@ApiOperation(value = "게시글 상세 조회 - find by id")
	@GetMapping("/{id}")
	public ResponseEntity<BoardResponseDto> getOneBoardById(
		@PathVariable Long id,
		@RequestParam Long lastCommentId,
		@RequestParam int size,
		@RequestParam String userId
	) {
		lastCommentId = lastCommentId == -1 ? commentService.fetchLatestCommentId() + 1: lastCommentId;
		return new ResponseEntity<>(boardService.getBoard(id, lastCommentId, size, userId), HttpStatus.OK);
	}

	@ApiOperation(value = "오늘의 게시글 조회 - 14시마다 갱신됨")
	@GetMapping("/today")
	public ResponseEntity<?> getMostLikedBoard(@RequestParam("date") String dateStr) {
		Board board = boardService.getBoardWithMostLikes(dateStr);
		return ResponseEntity.ok().body(Objects.requireNonNullElse(board, "아직 오늘 작성된 게시글이 없어요"));
	}

	@ApiOperation(value = "게시글 수정")
	@PutMapping("/{id}")
	public ResponseEntity<Long> updateBoard(@PathVariable Long id, @RequestBody BoardUpdateRequestDto requestDto) {
		return ResponseEntity.ok(boardService.updateBoard(id, requestDto));
	}

	@ApiOperation(value = "게시글 삭제")
	@DeleteMapping("/{id}")
	public void removeBoard(@PathVariable Long id) {
		boardService.deleteBoard(id);
	}

}

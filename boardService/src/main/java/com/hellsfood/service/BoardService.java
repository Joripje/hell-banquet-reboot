package com.hellsfood.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hellsfood.domain.board.Board;
import com.hellsfood.domain.board.BoardRepository;
import com.hellsfood.domain.comment.Comment;
import com.hellsfood.domain.comment.CommentRepository;
import com.hellsfood.domain.rating.Rating;
import com.hellsfood.domain.rating.RatingRepository;
import com.hellsfood.dto.board.BoardListResponseDto;
import com.hellsfood.dto.board.BoardResponseDto;
import com.hellsfood.dto.board.BoardSaveRequestDto;
import com.hellsfood.dto.board.BoardUpdateRequestDto;
import com.hellsfood.dto.comment.CommentListResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;
	private final RatingRepository ratingRepository;

	@Transactional
	public Long saveBoard(BoardSaveRequestDto requestDto) {
		return boardRepository.save(requestDto.toEntity()).getId();
	}

	@Transactional(readOnly = true)
	public List<Board> findAllBoards() {
		return boardRepository.findAll();
	}

	@Transactional(readOnly = true)
	public List<BoardListResponseDto> fetchBoardPagesBy(Long lastBoardId, int size, String userId) {
		List<BoardListResponseDto> boardList = new ArrayList<>();
		Page<Board> boards = fetchPages(lastBoardId, size);

		for (Board board : boards) {
			Optional<Rating> optionalRating = ratingRepository.findById(board.getId());

			if (optionalRating.isPresent()) {
				Rating rating = optionalRating.get();
				BoardListResponseDto.BoardListResponseDtoBuilder builder = BoardListResponseDto.builder().entity(board);
				updateRatingInfo(rating, userId, null, builder);
				boardList.add(builder.build());
			} else {
				boardList.add(new BoardListResponseDto(board, 0, 0, 0));
			}
		}
		return boardList;
	}

	public Page<Board> fetchPages(Long lastBoardId, int size) {
		PageRequest pageable = PageRequest.of(0, size);
		return boardRepository.findByIdLessThanOrderByIdDesc(lastBoardId, pageable);
	}

	@Transactional(readOnly = true)
	public Long fetchLatestBoardId() {
		Optional<Board> latestBoard = boardRepository.findTopByOrderByIdDesc();
		return latestBoard.map(Board::getId).orElse(null);
	}

	@Transactional(readOnly = true)
	public BoardResponseDto getBoard(Long boardId, Long lastCommentId, int size, String userId) {
		Board board = getBoardById(boardId);
		Rating rating = getRating(board.getId());
		BoardResponseDto.BoardResponseDtoBuilder builder = BoardResponseDto.builder().entity(board);

		if (rating != null) {
			updateRatingInfo(rating, userId, builder, null);
		}

		List<CommentListResponseDto> commentDtos = getCommentDtos(boardId, lastCommentId, size);
		return builder.comments(commentDtos).build();
	}

	private List<CommentListResponseDto> getCommentDtos(Long boardId, Long lastCommentId, int size) {
		Page<Comment> comments = commentRepository.findByBoardIdAndIdLessThanOrderByIdDesc(boardId, lastCommentId, PageRequest.of(0, size, Sort.by(Sort.Direction.DESC, "createdAt")));
		return comments.stream()
			.map(CommentListResponseDto::new)
			.collect(Collectors.toList());
	}

	private Board getBoardById(Long boardId) {
		return boardRepository.findById(boardId).orElseThrow(() -> new NotFoundException("해당 게시글이 없습니다."));
	}

	private Rating getRating(Long boardId) {
		return ratingRepository.findById(boardId).orElse(null);
	}

	private void updateRatingInfo(Rating rating, String userId, BoardResponseDto.BoardResponseDtoBuilder boardResponseDtoBuilder, BoardListResponseDto.BoardListResponseDtoBuilder boardListResponseDtoBuilder) {
		int likeCount = rating.getLikeCount();
		int dislikeCount = rating.getDislikeCount();
		int isEvaluated = 0;

		if (rating.getUsers().containsKey(userId)) {
			isEvaluated = rating.getUsers().get(userId) ? 1 : 2;
		}

		if (boardResponseDtoBuilder != null) {
			boardResponseDtoBuilder.likeCount(likeCount)
				.dislikeCount(dislikeCount)
				.evaluationStatus(isEvaluated);
		}

		if (boardListResponseDtoBuilder != null) {
			boardListResponseDtoBuilder.likeCount(likeCount)
				.dislikeCount(dislikeCount)
				.evaluationStatus(isEvaluated);
		}
	}

	public Board getBoardWithMostLikes(String dateStr) {
		LocalDateTime startDateTime = parseDate(dateStr).atStartOfDay();
		LocalDateTime endDateTime = startDateTime.plusDays(1);

		List<Board> boards = boardRepository.findByCreatedAtBetween(startDateTime, endDateTime);
		if (boards.isEmpty()) {
			throw new NotFoundException("해당 기간 동안 작성된 게시글이 없습니다.");
		}

		Board boardWithMostLikes = null;
		int maxLikes = 0;

		for (Board board : boards) {
			Optional<Rating> optionalRating = ratingRepository.findById(board.getId());

			if (optionalRating.isPresent()) {
				Rating rating = optionalRating.get();
				int likeCount = rating.getLikeCount();

				if (maxLikes <= likeCount) {
					boardWithMostLikes = board;
					maxLikes = likeCount;
				}
			}
		}
		return boardWithMostLikes;
	}

	@Transactional
	public Long updateBoard(Long boardId, BoardUpdateRequestDto requestDto) {
		Board board = getBoardById(boardId);
		board.update(requestDto);
		return boardId;
	}

	@Transactional
	public void deleteBoard(Long boardId) {
		Board board = getBoardById(boardId);
		boardRepository.delete(board);
	}

	private LocalDate parseDate(String dateStr) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDate.parse(dateStr, formatter);
	}

	public static class NotFoundException extends RuntimeException {
		public NotFoundException(String message) {
			super(message);
		}
	}

}
package com.hellsfood.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hellsfood.domain.board.BoardRepository;
import com.hellsfood.domain.rating.Rating;
import com.hellsfood.domain.rating.RatingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RatingService {

	private final BoardRepository boardRepository;
	private final RatingRepository ratingRepository;

	@Transactional(readOnly = true)
	public Rating getRating(Long boardId) {
		return ratingRepository.findById(boardId)
			.orElseThrow(() -> new IllegalArgumentException("해당 게시글에 대한 평가가 없습니다."));
	}

	@Transactional
	public Rating reactToBoard(Long boardId, String userId, boolean newStatus) {
		boardRepository.findById(boardId)
			.orElseThrow(() -> new NoSuchElementException("해당 게시글이 없습니다."));

		Rating rating = ratingRepository.findById(boardId)
			.orElse(Rating.builder().id(boardId).build());

		if (rating.getUsers().containsKey(userId)) {

			if (rating.getUsers().get(userId) == newStatus) {
				// 이미 해당 유저가 이전에 해당 글에 좋아요 또는 싫어요를 눌렀는데 같은 상태로 누르면 삭제
				rating.removeUserReaction(userId);
			} else {
				// 이미 해당 유저가 이전에 해당 글에 좋아요 또는 싫어요를 눌렀는데 상태가 변경되면 업데이트
				rating.updateUserReaction(userId, newStatus);
			}
		} else {
			// 해당 유저가 이전에 해당 글에 좋아요 또는 싫어요를 누르지 않았으면 추가
			rating.addUserReaction(userId, newStatus);
		}
		ratingRepository.save(rating);
		return rating;
	}

}

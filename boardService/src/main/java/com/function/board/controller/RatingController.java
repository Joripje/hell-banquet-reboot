package com.function.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.board.domain.rating.Rating;
import com.function.board.service.RatingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards/{boardId}/rating")
public class RatingController {

	private final RatingService ratingService;

	@PostMapping
	public ResponseEntity<Rating> addReaction(@PathVariable Long boardId,
		@RequestParam String userId,
		@RequestParam String status) {

		System.out.println("Status : " + status);
		if (status.equals("like") || status.equals("dislike")) {
			boolean reaction = status.equals("like");
			System.out.println("reaction : " + reaction);
			Rating rating = ratingService.addRating(boardId, userId, reaction);
			return ResponseEntity.ok(rating);
		}
		System.out.println("like 도 dislike도 아니야");
		Rating rating = null;
		return ResponseEntity.ok(rating);

	}

}

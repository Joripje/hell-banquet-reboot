package com.function.board.domain.rating;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "rating")
public class Rating {

	@Id
	private Long id;
	private int likeCount = 0;
	private int dislikeCount = 0;
	private Map<String, Boolean> users = new HashMap<>();

	@Builder
	public Rating(Long id, Map<String, Boolean> users) {
		this.id = id;
		this.users = users != null ? users : new HashMap<>();
	}
	public void updateLikeCount() {
		this.likeCount = (int) users.values().stream().filter(v -> v).count();
	}

	public void updateDislikeCount() {
		this.dislikeCount = (int) users.values().stream().filter(v -> !v).count();
	}

	public void addUserReaction(String userId, boolean currentStatus) {
		users.put(userId, currentStatus);
	}

	public void updateUserReaction(String userId, boolean status) {
		users.replace(userId, status);
	}
	public void removeUserReaction(String userId) {
		users.remove(userId);
	}
}

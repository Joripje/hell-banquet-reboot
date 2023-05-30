package com.hellsfood.domain;

import lombok.Getter;

@Getter
public enum Category {
	KOREAN("한식"),
	JAPANESE("일식"),
	CHINESE("중식"),
	SINGLE("일품"),
	WESTERN("양식");

	private final String value;

	Category(String value) {
		this.value = value;
	}

	public static Category fromValue(String value) {
		for (Category category : values()) {
			if (category.getValue().equals(value)) {
				return category;
			}
		}
		throw new IllegalArgumentException("유효하지 않은 이름: " + value);
	}
}

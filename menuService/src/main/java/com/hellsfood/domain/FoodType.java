package com.hellsfood.domain;

import lombok.Getter;

@Getter
public enum FoodType {
	RICE("밥"),
	NOODLE("면"),
	MANDU("만두"),
	SOUP("국"),
	STEAM("찜"),
	ROAST("구이"),
	JEON("전"),
	STIR_FRY("볶음"),
	JORIM("조림"),
	FRY("튀김"),
	NAMUL("나물"),
	KIMCHI("김치"),
	PICKLED("절임");

	private final String value;

	FoodType(String value) {
		this.value = value;
	}

	public static FoodType fromValue(String value) {
		for (FoodType foodType : values()) {
			if (foodType.getValue().equals(value)) {
				return foodType;
			}
		}
		throw new IllegalArgumentException("유효하지 않은 이름: " + value);
	}

}

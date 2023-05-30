package com.hellsfood.domain.janban;

import java.util.Arrays;
import java.util.List;

import com.hellsfood.domain.image.JanbanCode;

import lombok.Getter;

@Getter
public enum JanbanFeature {
	GRD("육", Arrays.asList(JanbanCode.GRD_001, JanbanCode.GRD_002)),
	SEA("해", Arrays.asList(JanbanCode.SEA_001, JanbanCode.SEA_002)),
	SKY("공", Arrays.asList(JanbanCode.SKY_001, JanbanCode.SKY_002));

	private final String value;
	private final List<JanbanCode> janbanCodes;

	JanbanFeature(String value, List<JanbanCode> janbanCodes) {
		this.value = value;
		this.janbanCodes = janbanCodes;
	}

	// public JanbanCode getRandomJanbanCode() {
	// 	int randomIndex = new Random().nextInt(janbanCodes.size());
	// 	return janbanCodes.get(randomIndex);
	// }
	public JanbanCode getJanbanCode() {
		return janbanCodes.get(0);
	}

	public static JanbanFeature fromValue(String value) {
		for (JanbanFeature feature : values()) {
			if (feature.getValue().equals(value)) {
				return feature;
			}
		}
		throw new IllegalArgumentException("유효하지 않은 Feature 값: " + value);
	}
}

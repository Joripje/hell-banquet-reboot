package com.hellsfood.domain.image;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum JanbanCode {
	GRD_001("GRD", "None", "001"),
	SEA_001("SEA", "None", "001"),
	SKY_001("SKY", "None", "001"),
	GRD_002("GRD", "나비넥타이", "002"),
	SEA_002("SEA", "나비넥타이", "002"),
	SKY_002("SKY", "나비넥타이", "002"),
	GRD_003("GRD", "케잌", "003"),
	SEA_003("SEA", "케잌", "003"),
	SKY_003("SKY", "케잌", "003"),
	GRD_004("GRD", "캠프파이어", "004"),
	GRD_005("GRD", "고양이", "005"),
	SEA_005("SEA", "고양이", "005"),
	SKY_005("SKY", "고양이", "005"),
	GRD_006("GRD", "꽃", "006"),
	SEA_006("SEA", "꽃", "006"),
	SKY_006("SKY", "꽃", "006"),
	GRD_007("GRD", "기타", "007"),
	SEA_007("SEA", "기타", "007"),
	SKY_007("SKY", "기타", "007"),
	GRD_008("GRD", "헬멧", "008"),
	SEA_008("SEA", "헬멧", "008"),
	SKY_008("SKY", "헬멧", "008"),
	GRD_009("GRD", "콧수염", "009"),
	SEA_009("SEA", "콧수염", "009"),
	SKY_009("SKY", "콧수염", "009"),
	SKY_010("SKY", "낙하산", "010"),
	GRD_011("GRD", "총", "011"),
	SEA_011("SEA", "총", "011"),
	SKY_011("SKY", "총", "011"),
	GRD_012("GRD", "삽", "012"),
	SEA_012("SEA", "삽", "012"),
	SKY_012("SKY", "삽", "012"),
	SEA_013("SEA", "스노클", "013"),
	GRD_014("GRD", "눈사람", "014"),
	SEA_014("SEA", "눈사람", "014"),
	SKY_014("SKY", "눈사람", "014"),
	GRD_015("GRD", "트럼펫", "015"),
	SEA_015("SEA", "트럼펫", "015"),
	SKY_015("SKY", "트럼펫", "015"),
	GRD_016("GRD", "우산", "016"),
	SEA_016("SEA", "우산", "016"),
	SKY_016("SKY", "우산", "016");
	
	private final String janbanFeature;
	private final String propName;
	private final String propCode;

	JanbanCode(String janbanFeature, String propName, String propCode) {
		this.janbanFeature = janbanFeature;
		this.propName = propName;
		this.propCode = propCode;
	}

	public static JanbanCode findByPropNameAndJanbanFeature(String propName, String janbanFeature) {
		for (JanbanCode janbanCode : JanbanCode.values()) {
			if (janbanCode.getPropName().equals(propName) && janbanCode.getJanbanFeature().equals(janbanFeature)) {
				return janbanCode;
			}
		}
		return null;
	}


}

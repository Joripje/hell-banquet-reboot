package com.hellsfood.domain.janban;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.hellsfood.domain.image.JanbanCode;
import com.hellsfood.dto.JanbaniDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "janbani")
public class Janbani {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_id", nullable = false)
	private String userId;

	@Column(name = "feature", nullable = false)
	@Enumerated(EnumType.STRING)
	private JanbanFeature feature;            //육 / 해 / 공

	@Column(name = "janban_code", nullable = false)
	@Enumerated(EnumType.STRING)
	private JanbanCode janbanCode;            //[특성]_[소품번호]

	@LastModifiedDate
	@Column(name = "updated_at", nullable = false)
	@ColumnDefault("CURRENT_TIMESTAMP")
	private LocalDateTime updatedAt;

	@Builder
	public Janbani(String userId, String feature, JanbanCode janbanCode) {
		this.userId = userId;
		this.feature = JanbanFeature.fromValue(feature);
		this.janbanCode = janbanCode;
	}

	public void update(JanbanFeature feature, JanbanCode janbanCode) {
		this.feature = feature;
		this.janbanCode = janbanCode;
	}

	public void updateJanbanCode(JanbanCode janbanCode) {
		this.janbanCode = janbanCode;
	}

	public JanbaniDto toDto() {
		return new JanbaniDto(this.userId, this.feature.getValue(), this.feature.toString(), this.updatedAt);
	}

}

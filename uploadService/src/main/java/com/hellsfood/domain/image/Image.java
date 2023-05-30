package com.hellsfood.domain.image;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "character_image")
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "file_path", nullable = false)
	private String filePath;

	@Enumerated(value = EnumType.STRING)
	@Column(name = "props_name", nullable = false)
	private JanbanCode janbanCode;

	@Builder
	public Image(String filePath, JanbanCode janbanCode) {
		this.filePath = filePath;
		this.janbanCode = janbanCode;
	}

}

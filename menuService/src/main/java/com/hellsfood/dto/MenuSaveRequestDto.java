package com.hellsfood.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MenuSaveRequestDto {

	private String managerId;
	private String type;
	private String category;
	private String feature;
	private List<String> menuItems;
	private List<String> menuTypes;
	private String date;

	@Builder
	public MenuSaveRequestDto(String managerId, String type, String category, String feature,
		List<String> menuItems, List<String> menuTypes, String date) {
		this.managerId = managerId;
		this.type = type;
		this.category = category;
		this.feature = feature;
		this.menuItems = menuItems;
		this.menuTypes = menuTypes;
		this.date = date;
	}

}

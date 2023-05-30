package com.hellsfood.domain;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.hellsfood.dto.ExcelizedMenuRegisterResultDto;
import com.hellsfood.dto.MenuSaveRequestDto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "menu")
public class Menu {

	@Id
	private long id;

	@ApiModelProperty(example = "영양사 아이디")
	private String managerId;

	@ApiModelProperty(example = "식단 일자")
	private LocalDate date;

	@ApiModelProperty(example = "A/B")
	private String type;

	@ApiModelProperty(example = "식단 카테고리 (한식/일식/중식/양식/일품)")
	private Category category;

	@ApiModelProperty(example = "식단 주요 특성 (육/해/공)")
	private String feature;

	@ApiModelProperty(example = "메뉴 이름 리스트")
	private List<String> menuItems;

	@ApiModelProperty(example = "메뉴 타입 리스트")
	private List<FoodType> menuTypes;

	public Menu(long id, String managerId, LocalDate date, String type, Category category, String feature,
		List<String> menuItems, List<FoodType> menuTypes) {
		this.id = id;
		this.managerId = managerId;
		this.date = date;
		this.type = type;
		this.category = category;
		this.feature = feature;
		this.menuItems = menuItems;
		this.menuTypes = menuTypes;
	}

	public Menu(long id, MenuSaveRequestDto dto, LocalDate date) {
		this.id = id;
		this.managerId = dto.getManagerId();
		this.type = dto.getType();
		this.category = Category.fromValue(dto.getCategory());
		this.feature = dto.getFeature();
		this.menuItems = dto.getMenuItems();
		this.menuTypes = dto.getMenuTypes().stream()
			.map(FoodType::fromValue)
			.collect(Collectors.toList());
		this.date = date;
	}

	public Menu(long id, ExcelizedMenuRegisterResultDto dto) {
		this.id = id;
		this.managerId = dto.getManagerId();
		this.date = dto.getDate();
		this.type = dto.getType();
		this.category = Category.fromValue(dto.getCategory());
		this.feature = dto.getFeature();
		this.menuItems = dto.getMenuItems();
		this.menuTypes = dto.getMenuTypes().stream()
			.map(FoodType::fromValue)
			.collect(Collectors.toList());
	}

}

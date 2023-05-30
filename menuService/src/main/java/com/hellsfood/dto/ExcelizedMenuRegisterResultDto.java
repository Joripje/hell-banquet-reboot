package com.hellsfood.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ExcelizedMenuRegisterResultDto {

	private int requestNo;
	private String managerId;
	private String type;
	private String category;
	private String feature;
	private List<String> menuItems;
	private List<String> menuTypes;
	private LocalDate date;

	public ExcelizedMenuRegisterResultDto(int requestNo) {
		this.requestNo = requestNo;
	}

}

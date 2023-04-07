package com.hellsfood.api.users.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ExcelizedUserRegisterResultDto {
	private int requestNo;
	private String email;
	private String userId;
	private String name;
	private String errorInfo;
	private String result;

	public ExcelizedUserRegisterResultDto(int requestNo) {
		this.requestNo = requestNo;
	}
}

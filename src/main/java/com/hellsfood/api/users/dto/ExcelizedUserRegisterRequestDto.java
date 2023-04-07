package com.hellsfood.api.users.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ExcelizedUserRegisterRequestDto {
	private String preferredId;
	private String email;
	private String preferredName;
}
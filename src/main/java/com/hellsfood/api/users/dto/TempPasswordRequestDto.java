package com.hellsfood.api.users.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TempPasswordRequestDto {
	private String email;
}

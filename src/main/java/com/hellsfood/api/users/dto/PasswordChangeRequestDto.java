package com.hellsfood.api.users.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PasswordChangeRequestDto {

	private String userId;
	private String newPassword;
}

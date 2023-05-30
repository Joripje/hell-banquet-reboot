package com.hellsfood.api.auth.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
@ApiModel("사용자 로그인 요청 정보")
public class LoginRequestDto {
	private String userId;

	private String password;

}

package com.hellsfood.api.auth.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Getter
@ApiModel("사용자 로그인 요청 정보")
public class LoginRequestDto {
	@ApiModelProperty(name = "입력한 ID")
	private String userId;

	@ApiModelProperty(name="입력한 비밀번호")
	private String password;

}

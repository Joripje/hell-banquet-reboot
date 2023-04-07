package com.hellsfood.api.users.dto;

import com.hellsfood.api.users.data.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserRegisterRequestDto {
	private String userId;
	private String password;
	private String name;
	private String email;

	public User toEntity(){
		return User.builder()
			.userId(userId)
			.password(password)
			.name(name)
			.email(email)
			.build();
	}

}

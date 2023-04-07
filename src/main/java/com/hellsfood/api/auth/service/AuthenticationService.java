package com.hellsfood.api.auth.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hellsfood.api.auth.data.User;
import com.hellsfood.api.auth.data.UserRepository;
import com.hellsfood.api.roles.data.Role;
import com.hellsfood.api.tokens.dto.JwtTokenDto;
import com.hellsfood.api.tokens.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationService implements UserDetailsService {

	private final UserRepository userRepository;

	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	private final JwtTokenService jwtService;

	public JwtTokenDto login(String id, String password) {
		System.out.println("로그인 시도 ID: " + id + ", 입력한 비밀번호: " + password);

		// Step 1. 로그인 ID/비밀번호 기반으로 Authentication 객체 생성
		// 이 때, 인증 여부를 확인하는 authenticated 값을 false로 한다.
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(id, password);

		// Step 2. 실제 검증 (사용자 비밀번호 체크 등)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

		// Step 3. 인증된 정보를 기반으로 JwtToken 생성
		User userDetails = (User)authentication.getPrincipal();
		String userId = userDetails.getUserId();
		JwtTokenDto jwtTokenDto = null;
		if (userId != null) {
			List<Role> roles = userRepository.findByUserId(userId).get().getRoles();
			jwtTokenDto = jwtService.login(userId, roles);
		}
		return jwtTokenDto;
	}

	public boolean logout(String refreshToken) {
		return jwtService.logout(refreshToken);
	}

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		return userRepository.findByUserId(userId)
			.orElse(null);
	}

	public ResponseEntity validateRequest(String requestId, String accessToken) {
		String extractedId = jwtService.getUserIdFromAccessToken(accessToken);
		if (extractedId == null) {
			return ResponseEntity.badRequest().body("만료된 Access Token입니다.");
		}
		return ResponseEntity.ok(extractedId.equals(requestId));
	}
}

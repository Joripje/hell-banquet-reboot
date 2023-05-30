package com.hellsfood.api.auth.service;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hellsfood.api.auth.data.Role;
import com.hellsfood.api.auth.data.RoleRepository;
import com.hellsfood.api.auth.data.User;
import com.hellsfood.api.auth.data.UserRepository;
import com.hellsfood.api.tokens.dto.JwtTokenDto;
import com.hellsfood.api.tokens.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthenticationService implements UserDetailsService {

	private final UserRepository userRepository;

	private final RoleRepository roleRepository;

	private final AuthenticationManagerBuilder authenticationManagerBuilder;

	private final JwtTokenService tokenService;

	public JwtTokenDto login(String id, String password) {
		System.out.println("로그인 시도 ID: " + id + ", 입력한 비밀번호: " + password);

		// Step 1. 로그인 ID/비밀번호 기반으로 Authentication 객체 생성
		// 이 때, 인증 여부를 확인하는 authenticated 값을 false로 한다.
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password);

		// Step 2. 실제 검증 (사용자 비밀번호 체크 등)이 이루어지는 부분
		// authenticate 매서드가 실행될 때 loadUserByUsername 메서드가 실행
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authToken);

		// Step 3. 인증된 정보를 기반으로 JwtToken 생성
		User userDetails = (User)authentication.getPrincipal();
		String userId = userDetails.getUserId();
		JwtTokenDto jwtTokenDto = null;
		if (userId != null) {
			List<Role> roles = userRepository.findByUserId(userId).get().getRoles();
			jwtTokenDto = tokenService.login(userId, roles);
		}
		return jwtTokenDto;
	}

	public boolean logout(String refreshToken) {
		return tokenService.logout(refreshToken);
	}

	public String findUserIdByEmail(String email) {
		return userRepository.findUserIdByEmail(email).orElse(null);
	}

	// Spring Security 기반으로 로그인 할 때 반드시 필요한 UserDetailService 의 필수 Override 함수.
	// 명식적으로 사용되지는 않으며, Spring Framework 내부에서 호출해서 사용하는 함수이다.
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		return userRepository.findByUserId(userId)
			.orElse(null);
	}

	public int validateRequiredId(String requestId, String accessToken) {
		String extractedId = tokenService.getUserIdFromAccessToken(accessToken);
		System.out.println("JWT 토큰상 ID:" + extractedId + ", 요청 ID: " + requestId);
		return requestId.equals(extractedId) ? 0 : 1;
	}

	public int validateRequiredRole(String requiredRole, String accessToken) {
		System.out.println("불러온 정보 : " + roleRepository.findRolesByUsers_UserId(tokenService.getUserIdFromAccessToken(accessToken))
			.orElse(null));
		List<Role> grantedRole = roleRepository.findRolesByUsers_UserId(tokenService.getUserIdFromAccessToken(accessToken))
			.orElseThrow(() -> new RuntimeException("토큰 정보가 유효하지 않습니다."));
		for (Role r : grantedRole) {
			System.out.println("필요 권한: " + requiredRole + ", 현재 탐색중인 권한: " + r.getRoleName());
			if (r.getRoleName().equals(requiredRole)) {
				return 0;
			}
		}
		return 1;
	}
}

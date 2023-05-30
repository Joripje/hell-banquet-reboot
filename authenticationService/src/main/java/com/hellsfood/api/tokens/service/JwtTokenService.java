package com.hellsfood.api.tokens.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.hellsfood.api.auth.data.Role;
import com.hellsfood.api.tokens.JwtTokenProvider;
import com.hellsfood.api.tokens.data.RefreshToken;
import com.hellsfood.api.tokens.data.RefreshTokenRepository;
import com.hellsfood.api.tokens.dto.JwtTokenDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtTokenService {
	private final JwtTokenProvider jwtTokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;

	@Transactional
	public JwtTokenDto login(String userId, List<Role> roles) {
		JwtTokenDto jwtTokenDto = jwtTokenProvider.createToken(userId, roles);
		log.info("[login@JwtTokenService] JwtTokenDto: " + jwtTokenDto);
		if (refreshTokenRepository.existsByUserId(userId)) {
			log.info(userId + "의 비정상 로그아웃 토큰값을 삭제합니다.");
			refreshTokenRepository.deleteByUserId(userId);
		}
		log.info(userId + "의 Refresh Token을 생성합니다.");
		RefreshToken newToken = RefreshToken.builder()
			.userId(userId)
			.refreshToken(jwtTokenDto.getRefreshToken())
			.build();
		refreshTokenRepository.save(newToken);
		return jwtTokenDto;
	}

	@Transactional
	public boolean logout(String refreshToken) {
		if (refreshToken.startsWith("Bearer ")) {
			refreshToken = refreshToken.substring(7);
		}
		if (refreshTokenRepository.existsByRefreshToken(refreshToken)) {
			log.info("유효한 로그인 세션을 종료합니다.");
			refreshTokenRepository.deleteByRefreshToken(refreshToken);
			return true;
		} else {
			log.info("DB에서 refreshToken 조회에 실패했습니다.");
		}
		return false;
	}

	public String getUserIdFromAccessToken(String accessToken) {
		return jwtTokenProvider.getUserIdFromAccessToken(accessToken);
	}
}
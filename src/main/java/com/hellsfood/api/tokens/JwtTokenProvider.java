package com.hellsfood.api.tokens;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.hellsfood.api.roles.data.Role;
import com.hellsfood.api.tokens.dto.JwtTokenDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

	@Value("${jwt.secret}")
	private String uniqueKey;

	private int accessTokenValidTime = 1000 * 60 * 60 * 12; // AccessToken 유효시간 : 12시간 -> QA 테스트시 30초
	private int refreshTokenValidTime = 1000 * 60 * 60 * 24 * 14; // RefreshToken 유효시간 : 2주 -> QA 테스트시 5분

	@PostConstruct
	protected void init(){
		uniqueKey= Base64.getEncoder().encodeToString(uniqueKey.getBytes());
	}

	// 유저 정보를 토대로 AccessToken, RefreshToken을 생성하는 메서드

	public JwtTokenDto createToken(String userId, List<Role> roles){
		Claims claims= Jwts.claims().setSubject(userId);
		claims.put("roles",roles);

		Date now = new Date();

		// Access Token 생성
		String accessToken = Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + accessTokenValidTime)) // Access Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		// Refresh Token 생성
		String refreshToken = Jwts.builder()
			.setExpiration(new Date(now.getTime() + refreshTokenValidTime)) // Refresh Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, uniqueKey)
			.compact();

		return JwtTokenDto.builder()
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.userId(userId)
			.build();
	}

	// Jwt 토큰에서 회원 ID 추출
	public String getUserIdFromAccessToken(String token) {
		try {
			return Jwts.parser().setSigningKey(uniqueKey).parseClaimsJws(token).getBody().getSubject();
		}catch (ExpiredJwtException e){
			return null;
		}
	}

}

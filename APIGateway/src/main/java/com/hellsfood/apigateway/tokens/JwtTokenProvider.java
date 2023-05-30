package com.hellsfood.apigateway.tokens;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import com.hellsfood.apigateway.tokens.data.RefreshToken;
import com.hellsfood.apigateway.tokens.data.RefreshTokenRepository;
import com.hellsfood.apigateway.tokens.dto.JwtTokenDto;
import com.hellsfood.apigateway.users.data.RoleRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

	@Value("${jwt.secret}")
	private String UNIQUE_KEY;

	private final int ACCESS_TOKEN_VALID_TIME = 1000 * 60 * 60 * 12; // AccessToken 유효시간 : 12시간 -> QA 테스트시 30초

	private final RoleRepository roleRepository;

	private final RefreshTokenRepository refreshTokenRepository;

	@PostConstruct
	protected void init() {
		UNIQUE_KEY = Base64.getEncoder().encodeToString(UNIQUE_KEY.getBytes());
	}

	public JwtTokenDto resolveToken(ServerHttpRequest request) {
		JwtTokenDto tokenDto=JwtTokenDto.builder()
			.accessToken(request.getHeaders().get("Authorization").get(0).substring(7))
			// 나중에 Cookie를 주고받는 문제가 해결되면 아래 코드로 cookie를 가져올 수 있습니다.
			// .refreshToken(request.getCookies().get("a802-rt").get(0).getValue().substring(7))
			.refreshToken(request.getHeaders().get("refreshToken").get(0).substring(7))
			.build();
		if (!refreshTokenRepository.existsByRefreshToken(tokenDto.getRefreshToken())) {
			return null;
		}
		System.out.println("[resolveToken@JwtTokenProvider]" + tokenDto);
		return tokenDto;
	}

	// 유저 정보를 토대로 AccessToken, RefreshToken을 생성하는 메서드
	public String reCreateToken(String userId) {
		Claims claims = Jwts.claims().setSubject(userId);
		claims.put("roles", roleRepository.findRolesByUsers_UserId(userId));
		Date now = new Date();

		return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME)) // Access Token의 만료 날짜 설정.
			.signWith(SignatureAlgorithm.HS256, UNIQUE_KEY)
			.compact();
	}

	public String getUserIdFromRefreshToken(String refreshToken) {
		Optional<RefreshToken> refreshTokenDto = refreshTokenRepository.findByRefreshToken(refreshToken);

		return refreshTokenDto.map(RefreshToken::getUserId).orElse(null);
	}

	public boolean isTokenNotExpired(String token) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(UNIQUE_KEY).parseClaimsJws(token);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (SecurityException | MalformedJwtException e) {
			log.info("유효하지 않은 Token !! -> " + token);
		} catch (ExpiredJwtException e) {
			log.info("만료된 Token !! -> " + token);
		} catch (UnsupportedJwtException e) {
			log.info("지원하지 않는 형식의 Token !! -> " + token);
		} catch (IllegalArgumentException e) {
			log.info("Token이 빈 문자열을 반환하였습니다 !! -> " + token);
		}
		return false;
	}
}

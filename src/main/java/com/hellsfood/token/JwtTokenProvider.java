package com.hellsfood.token;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

	@Value("${jwt.secret}")
	private String UNIQUE_KEY;

	public String getUserIdfromAccessToken(String token){
		String userId = null;
		try {
			userId = Jwts.parser().setSigningKey(UNIQUE_KEY.getBytes()).parseClaimsJws(token).getBody().getSubject();
		} catch (Exception e) {
			System.out.println("AccessToken에서 회원 ID 추출 중 오류가 발생했습니다.\n" + e.getMessage());
		}
		return userId;
	}

}

package com.hellsfood.api.auth.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellsfood.api.auth.service.AuthenticationService;
import com.hellsfood.api.auth.dto.LoginRequestDto;
import com.hellsfood.api.tokens.dto.JwtTokenDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "로그인 인증 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	private final AuthenticationService authService;

	@ApiOperation(value = "Hello", notes = "CI/CD 정상 동작 테스트를 위한 API")
	@GetMapping("/hello")
	public String hello() {
		return "회원 인증 API";
	}

	@ApiOperation(value = "로그인", notes = "ID와 암호화된 PW가 DB에 있는 정보와 일치하는 경우 로그인을 승인한다.")
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @ApiParam(value = "로그인 요청 정보", required = true) LoginRequestDto requestDto,
		HttpServletResponse response) {
		String userId = requestDto.getUserId();
		if (userId.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
			userId = authService.findUserIdByEmail(userId);
			System.out.println("[이메일 형식 ID 검출] 변환된 userID: " + userId);
		}
		if (userId != null) {
			String password = requestDto.getPassword();

			JwtTokenDto jwtToken = authService.login(userId, password);
			if (jwtToken != null) {
				// ResponseCookie cookie = ResponseCookie.from("a802-at", "Bearer-" + jwtToken.getAccessToken())
				// 	.maxAge(60 * 60 * 13) // 단위: 초 (jwtProvider는 단위: ms)
				// 	.secure(true) //-> https 요청에만 사용 가능하게 하는거라 나중에 설정할것.
				// 	.path("/")
				// 	.sameSite("None")
				// 	.build();
				// response.addHeader("Set-Cookie", cookie.toString());

				// cookie = ResponseCookie.from("a802-rt", "Bearer-" + jwtToken.getRefreshToken())
				// 	.maxAge(60 * 60 * 24 * 14) // 단위: 초 (jwtProvider는 단위: ms)
				// 	// cookie.setSecure(true); //-> https 요청에만 사용 가능하게 하는거라 나중에 설정할것.
				// 	.secure(true)
				// 	.path("/")
				// 	.build();
				// response.addHeader("Set-Cookie", cookie.toString());
				response.addHeader("Authorization", "Bearer-" + jwtToken.getAccessToken());
				response.addHeader("refreshToken", "Bearer-" + jwtToken.getRefreshToken());
				return ResponseEntity.ok(userId + "님, 환영합니다.");
			}
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("아이디 또는 비밀번호를 다시 확인하세요.");
	}

	@ApiOperation(value = "로그아웃", notes = "Http 헤더로부터 refreshToken을 추출하여 DB에서 삭제 한다.")
	@PostMapping("/logout")
	public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = null;
		// for (Cookie cookie : request.getCookies()) {
		// 	if (cookie.getName().equals("a802-rt")) {
		// 		refreshToken = cookie.getValue().substring(7);
		// 		System.out.println(refreshToken);
		// 		break;
		// 	}
		// }
		if (request.getHeader("refreshToken") != null) {
			refreshToken = request.getHeader("refreshToken").substring(7);
		}

		if (refreshToken != null) {
			// Cookie cookie = new Cookie("a802-at", null);
			// cookie.setMaxAge(0);
			// cookie.setPath("/");
			// response.addCookie(cookie);
			// cookie = new Cookie("a802-rt", null);
			// cookie.setPath("/");
			// cookie.setMaxAge(0);
			// response.addCookie(cookie);
			if (authService.logout(refreshToken)) {
				return ResponseEntity.ok("정상적으로 로그아웃되었습니다.");
			} else {
				return ResponseEntity.accepted().body("로그아웃 되었습니다.");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비정상적인 로그아웃 요청입니다.");
	}

	@ApiOperation(value = "요청 검증", notes = "헤더에 있는 Access Token과 서비스 요청 주체의 일치 여부를 반환한다.")
	@GetMapping("/validate")
	public ResponseEntity validate(
		@ApiParam(value = "검증 종류. 0: ID, 1: 권한", required = true) String type,
		@ApiParam(value = "대조할 정보. ID: 요청한 사용자 ID, 권한: 필요한 권한 이름", required = true) String target,
		HttpServletRequest request) {
		int responseCode = 0;
		String accessToken;
		try {
			accessToken = request.getHeader("Authorization").substring(7);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("토큰 정보가 유효하지 않습니다.");
		}

		switch (type) {
			case "role":
			case "1":
				responseCode = authService.validateRequiredRole(target, accessToken);
				break;
			default:
				responseCode = authService.validateRequiredId(target, accessToken);

		}

		return ResponseEntity.ok(responseCode == 1 ? false : true);
	}
}

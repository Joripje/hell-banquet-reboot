package com.hellsfood.api.users.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hellsfood.api.mail.dto.MailDto;
import com.hellsfood.api.mail.service.MailService;
import com.hellsfood.api.users.data.User;
import com.hellsfood.api.users.dto.PasswordChangeRequestDto;
import com.hellsfood.api.users.dto.UserRegisterRequestDto;
import com.hellsfood.api.users.dto.TempPasswordRequestDto;
import com.hellsfood.api.users.dto.UpdateRequestDto;
import com.hellsfood.api.users.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = "회원 관리 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
	private final UserService userService;
	private final MailService mailService;

	@PostMapping("/register")
	@ApiOperation(value = "일반 회원 가입", notes = "입력 받은 회원 가입 요청 정보로 일반 회원 계정을 등록한다.")
	public ResponseEntity registerUser(
		@RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterRequestDto requestDto) {
		Long result = userService.registerUser(requestDto, "user");
		if (result == -1L) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디나 닉네임은 'guser'로 시작할 수 없습니다.");
		}
		return ResponseEntity.ok(requestDto.getUserId() + "님, 가입을 환영합니다.");
	}

	@PostMapping("/register/manager")
	@ApiOperation(value = "영양사(매니저)회원 가입", notes = "입력 받은 영양사 회원 가입 요청 정보로 영양사 계정을 등록한다.")
	public ResponseEntity registerManager(
		@RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterRequestDto requestDto) {
		Long result = userService.registerUser(requestDto, "manager");
		if (result == -1L) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("아이디나 닉네임은 'guser'로 시작할 수 없습니다.");
		}
		return ResponseEntity.ok(requestDto.getUserId() + "님, 가입을 환영합니다.");
	}

	@GetMapping("/info/{id}")
	@ApiOperation(value = "정보 조회", notes = "{id}에 해당하는 사용자 정보를 DB에서 가져온다.")
	public ResponseEntity getUser(@PathVariable @ApiParam(value = "회원정보를 조회할 사용자의 {id}", required = true) String id) {
		User user = userService.getUser(id);
		if (user.getDelFlag() != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("탈퇴한 사용자입니다.");
		} else {
			return ResponseEntity.ok(user);
		}
	}

	@PutMapping("/info/{id}")
	@ApiOperation(value = "정보 변경", notes = "갱신된 사용자 정보를 {id}를 PK로 가지는 레코드에 적용한다.")
	public ResponseEntity updateUser(
		@PathVariable @ApiParam(value = "회원정보를 수정할 사용자의 {id}", required = true) String id,
		@RequestBody @ApiParam(value = "수정할 내용이 담긴 데이터 객체", required = true) UpdateRequestDto requestDto,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		String updatedUserId = userService.updateUser(id, requestDto, accessToken);
		if (updatedUserId == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없는 사용자입니다.");
		}
		return ResponseEntity.ok(updatedUserId);
	}

	@DeleteMapping("/info/{id}")
	@ApiOperation(value = "회원 탈퇴", notes = "{id}의 사용자 정보에 탈퇴일(del_flag)을 기록한다.")
	public ResponseEntity deleteUser(@PathVariable @ApiParam(value = "탈퇴할 회원 ID", required = true) String id,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		String changedId = userService.deleteUser(id, accessToken);
		if (changedId == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없는 사용자입니다.");
		} else {
			return ResponseEntity.ok(changedId);
		}
	}

	@PutMapping("/pw")
	@ApiOperation(value = "비밀번호 변경", notes = "Request Header의 AccessToken으로부터 사용자 ID를 추출하여 해당 사용자의 비밀번호를 변경한다.")
	public ResponseEntity changePassword(
		@RequestBody @ApiParam(value = "새로운 비밀번호", required = true) PasswordChangeRequestDto requestDto,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		String updatedId = userService.updatePassword(requestDto.getUserId(), requestDto.getNewPassword(), true,
			accessToken);
		if (updatedId == null) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("토큰 정보와 요청 정보가 일치하지 않습니다.");
		} else {
			return ResponseEntity.ok(updatedId + "님의 비밀번호가 정상적으로 수정되었습니다.");
		}
	}

	@PostMapping("/pw")
	@ApiOperation(value = "임시 비밀번호 발급", notes = "비밀번호를 재설정하려는 ID와 이메일을 받아 회원 본인인지 확인하고, 맞다면 8자 구성의 임시 비밀번호를 반환한다.")
	public ResponseEntity getTempPassword(
		@RequestBody @ApiParam(value = "임시 비밀번호 발급 요청 정보", required = true) TempPasswordRequestDto requestDto) {
		String userEmail = requestDto.getEmail();

		String userId = userService.findActiveUserByEmail(userEmail);

		if (userId != null) {
			String tempPassword = userService.getTempPassword(userId);
			MailDto mailDto = mailService.createMailAndMakeTempPassword(userId, userEmail, tempPassword);
			mailService.sendMail(mailDto);
			return ResponseEntity.ok("등록된 메일 주소로 임시 비밀번호를 보내드렸습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body("입력한 정보에 해당하는 사용자가 없습니다.");
		}
	}

	@GetMapping("/check")
	@ApiOperation(value = "중복 검사", notes = "입력받은 가입 희망 회원 정보를 사용할 수 있는지 검사한다. 한 번에 한 종류만 검사가 가능하다.")
	public ResponseEntity canUseInputInfo(
		@PathVariable @ApiParam(value = "중복검사 할 ID", defaultValue = "") String id,
		@PathVariable @ApiParam(value = "중복검사 할 이메일", defaultValue = "") String email,
		@PathVariable @ApiParam(value = "중복검사 할 닉네임", defaultValue = "") String name) {
		return ResponseEntity.ok(userService.canUseInputInfo(id, email, name));
	}

	/**
	 *
	 * 추후 명세서에 정리하기 위한 API 동작 원리 정리.
	 *
	 * 방문 기록 리스트
	 * - Post 방식으로 방문 기록 내역 조회 요청
	 * - 아이디 정보는 accessToken으로부터 조회
	 * - 방문 기록이 없다면 방문한 리스트에 추가하고 false 반환
	 * - 방문 기록이 있다면 true 반환
	 */
	@PostMapping("/visited")
	@ApiOperation(value = "최초 방문 여부 확인", notes = "방문 내역이 있는 리스트를 조회하여 최조로 방문한 곳인지 여부를 검사한다.")
	public ResponseEntity isVisitedPage(
		@RequestBody @ApiParam(value = "처음으로 방문한 곳인지 검사할 웹페이지 path", required = true) String path,
		HttpServletRequest request) {
		String accessToken = request.getHeader("Authorization").substring(7);
		int resultCode = userService.isVisitedPage(path, accessToken);
		if (resultCode < 0) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰 검증 중 오류가 발생했습니다.");
		} else {
			return ResponseEntity.ok(resultCode == 1 ? true : false);
		}
	}
}

package com.hellsfood.api.users.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hellsfood.api.users.data.Role;
import com.hellsfood.api.users.data.RoleRepository;
import com.hellsfood.api.users.data.User;
import com.hellsfood.api.users.data.UserRepository;
import com.hellsfood.api.users.data.VisitList;
import com.hellsfood.api.users.data.VisitListRepository;
import com.hellsfood.api.users.dto.UserRegisterRequestDto;
import com.hellsfood.api.users.dto.UpdateRequestDto;
import com.hellsfood.token.JwtTokenProvider;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final JwtTokenProvider jwtTokenProvider;

	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final VisitListRepository visitRepository;

	private final PasswordEncoder passwordEncoder;

	@PostConstruct
	protected void init() {
		String[] defaultRoles = new String[] {"admin", "manager", "user"};
		for (String role : defaultRoles) {
			if (!roleRepository.existsByRoleName(role)) {
				roleRepository.save(new Role(role));
			}
		}
	}

	@Transactional
	public Long registerUser(UserRegisterRequestDto requestDto, String role) {
		if (requestDto.getUserId().startsWith("guser") || requestDto.getName().startsWith("guser")) {
			return -1L;
		}
		requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
		User tmpUser = requestDto.toEntity();
		tmpUser.setRoles(Collections.singletonList(
			roleRepository.findByRoleName(role).orElseThrow(() -> new RuntimeException("권한 설정 중 오류가 발생하였습니다."))));
		return userRepository.save(tmpUser).getId();
	}

	@Transactional
	public String updateUser(String userId, UpdateRequestDto requestDto, String accessToken) {
		User user = getActiveUserWithValidationCheck(userId, accessToken);
		if (user == null) {
			return null;
		}
		if (requestDto.getName() != null) {
			user.setName(requestDto.getName());
		}
		if (requestDto.getEmail() != null) {
			user.setEmail(requestDto.getEmail());
		}
		return userId;
	}

	@Transactional
	public String deleteUser(String id, String accessToken) {
		User user = getActiveUserWithValidationCheck(id, accessToken);
		if (user != null) {
			user.setDelFlag(LocalDateTime.now());
			return id;
		} else {
			return null;
		}
	}

	@Transactional
	public String updatePassword(String userId, String newPassword, boolean needValidation, String accessToken) {
		if (needValidation) {
			String extractedId = getUserIdFromAccessToken(accessToken);
			System.out.println("[updatePassword@UserService] AccessToken에서 추출한 userId: " + extractedId);
			if (!userId.equals(extractedId)) {
				return null;
			}
		}
		User user = getActiveUser(userId);
		String encodedPassword = passwordEncoder.encode(newPassword);
		user.setPassword(encodedPassword);
		System.out.println(userRepository.save(user));
		return user.getUserId();
	}

	@Transactional
	public String getTempPassword(String userId) {
		String tempPassword = makeTempPassword();
		return updatePassword(userId, tempPassword, false, null).equals(userId) ? tempPassword : null;
	}

	private User getActiveUserWithValidationCheck(String userId, String accessToken) {
		return getUserIdFromAccessToken(accessToken).equals(userId) ? getActiveUser(userId) : null;
	}

	public User getActiveUser(String userId) {
		User user = getUser(userId);
		if (user.getDelFlag() != null) {
			throw new IllegalArgumentException(userId + " 사용자는 탈퇴한 사용자입니다.");
		} else {
			return user;
		}
	}

	public String getUserIdFromAccessToken(String token) {
		return jwtTokenProvider.getUserIdfromAccessToken(token);
	}

	public User getUser(String id) {
		User user = userRepository.findByUserId(id)
			.orElseThrow(() -> new IllegalArgumentException(id + " 사용자를 찾을 수 없습니다."));
		return user;
	}

	private String makeTempPassword() {
		char[] charSet = new char[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
			'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
			'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z'};
		StringBuilder tempPassword = new StringBuilder();

		for (int i = 0; i < 8; i++) {
			int idx = (int)(charSet.length * Math.random());
			tempPassword.append(charSet[idx]);
		}
		return tempPassword.toString();
	}

	public String findActiveUserByEmail(String email) {
		return userRepository.findActiveUserIdByEmail(email).orElse(null);
	}

	@Transactional
	public int isVisitedPage(String path, String accessToken) {
		String requestId = getUserIdFromAccessToken(accessToken);
		if (requestId == null) {
			return -1;
		}

		if (!visitRepository.existsById(requestId)) {
			visitRepository.save(VisitList.builder()
				.userId(requestId)
				.visitList(new ArrayList<>())
				.build());
		}

		VisitList visitList = visitRepository.findById(requestId)
			.orElseThrow(() -> new RuntimeException("방문 기록 리스트를 불러오는 중 오류가 발생했습니다."));

		if (!visitList.getVisitList().contains(path)) {
			visitList.getVisitList().add(path);
			visitRepository.save(visitList);
			return 0;
		}
		return 1;
	}

	public boolean canUseInputInfo(String userId, String email, String name){
		if (!userId.equals("")) {
			return !userId.startsWith("guser") && !userRepository.existsByUserId(userId);
		} else if (!email.equals("")) {
			return !userRepository.existsByEmail(email);
		} else if (!name.equals("")) {
			return !name.startsWith("guser") && !userRepository.existsByName(name);
		} else {
			return false;
		}
	}
}

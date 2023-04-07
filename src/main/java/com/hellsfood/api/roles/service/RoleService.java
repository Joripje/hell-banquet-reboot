package com.hellsfood.api.roles.service;

import org.springframework.stereotype.Service;

import com.hellsfood.api.roles.data.Role;
import com.hellsfood.api.roles.data.RoleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoleService {
	private final RoleRepository roleRepository;

	public Role findByRoleName(String roleName) {
		return roleRepository.findByRoleName(roleName)
			.orElseThrow(() -> new IllegalArgumentException("해당 권한을 찾을 수 없습니다."));
	}

	public Long registerRole(String roleName){
		return roleRepository.save(new Role(roleName)).getId();
	}
}

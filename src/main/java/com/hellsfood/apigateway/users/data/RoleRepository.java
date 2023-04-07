package com.hellsfood.apigateway.users.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<List<Role>> findRolesByUsers_UserId(String userId);

	Optional<Role> findByRoleName(String roleName);
}

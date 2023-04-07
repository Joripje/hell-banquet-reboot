package com.hellsfood.api.auth.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserId(String userId);

	boolean existsByUserIdAndEmail(String userId, String email);

}

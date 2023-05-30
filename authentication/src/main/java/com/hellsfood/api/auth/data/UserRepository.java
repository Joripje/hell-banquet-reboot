package com.hellsfood.api.auth.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUserId(String userId);

	@Query("SELECT u.userId from User u where u.email=:email")
	Optional<String> findUserIdByEmail(String email);
}

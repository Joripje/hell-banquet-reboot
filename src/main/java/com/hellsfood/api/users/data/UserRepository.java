package com.hellsfood.api.users.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
	boolean existsByUserId(String userId);

	boolean existsByEmail(String email);

	boolean existsByName(String name);

	Optional<User> findByUserId(String userId);

	@Query("SELECT u.userId from User u where u.email=:email and u.delFlag is null")
	Optional<String> findActiveUserIdByEmail(String email);

	@Query("SELECT MAX(u.id) from User u")
	Long getLastUID();
}

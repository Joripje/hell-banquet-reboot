package com.hellsfood.api.tokens.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	Optional<RefreshToken> findByRefreshToken(String RefreshToken);

	boolean existsByUserId(String userId);

	boolean existsByRefreshToken(String RefreshToken);

	void deleteByUserId(String userId);

	void deleteByRefreshToken(String RefreshToken);
}

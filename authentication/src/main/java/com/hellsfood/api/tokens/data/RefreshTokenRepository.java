package com.hellsfood.api.tokens.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	boolean existsByUserId(String userId);

	boolean existsByRefreshToken(String RefreshToken);

	void deleteByUserId(String userId);

	void deleteByRefreshToken(String RefreshToken);
}

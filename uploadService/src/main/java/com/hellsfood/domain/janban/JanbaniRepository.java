package com.hellsfood.domain.janban;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JanbaniRepository extends JpaRepository<Janbani, Long> {

	Optional<Janbani> findByUserId(String userId);

}

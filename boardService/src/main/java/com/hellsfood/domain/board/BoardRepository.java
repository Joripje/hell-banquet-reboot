package com.hellsfood.domain.board;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

	Page<Board> findByIdLessThanOrderByIdDesc(Long lastBoardId, Pageable pageable);
	// List<Board> findAllByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime startDate, LocalDateTime endDate);

	Optional<Board> findTopByOrderByIdDesc();

	// Page<Board> findByContentContainingAndIdLessThanOrderByCreatedAtDesc(String keyword, Long lastBoardId, Pageable pageable);

	List<Board> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

}

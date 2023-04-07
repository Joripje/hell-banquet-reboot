package com.hellsfood.domain.comment;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	Optional<Comment> findTopByOrderByIdDesc();

	@Query("select c from Comment c where c.board.id = ?1 and c.id < ?2 order by c.id DESC")
	Page<Comment> findByBoardIdAndIdLessThanOrderByIdDesc(Long boardId, Long lastCommentId, PageRequest pageable);


}

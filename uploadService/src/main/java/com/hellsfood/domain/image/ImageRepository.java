package com.hellsfood.domain.image;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

	Image findOneByJanbanCode(JanbanCode janbanCode);
}

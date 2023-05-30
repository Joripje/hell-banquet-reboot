package com.hellsfood.domain.rating;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RatingRepository extends MongoRepository<Rating, Long> {

	Optional<Rating> findById(Long id);

}


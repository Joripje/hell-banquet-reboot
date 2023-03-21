package com.function.board.domain.rating;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RatingRepository extends MongoRepository<Rating, ObjectId> {

	Optional<Rating> findById(Long id);
}


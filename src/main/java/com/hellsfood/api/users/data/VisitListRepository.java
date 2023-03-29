package com.hellsfood.api.users.data;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VisitListRepository extends MongoRepository<VisitList, String> {
}

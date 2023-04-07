package com.hellsfood.domain;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MenuRepository extends MongoRepository<Menu, Long> {

	Menu findById(long id);

	void deleteById(Long id);

	List<Menu> findByManagerIdAndDate(String managerId, LocalDate date);

	Optional<Menu> findByManagerIdAndDateAndType(String managerId, LocalDate parseDate, String type);

	long countByDateAndManagerId(LocalDate time, String managerId);

	List<Menu> findByDate(LocalDate date);

}


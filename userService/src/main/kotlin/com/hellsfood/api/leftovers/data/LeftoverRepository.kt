package com.hellsfood.api.leftovers.data

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.LocalDate

interface LeftoverRepository : JpaRepository<Leftover, Long> {
    fun existsByUserIdAndDate(userId: String, date: LocalDate): Boolean

    @Query(value = "select * from leftover l where l.user_id = ?1 and l.date = ?2", nativeQuery = true)
    fun findByUserIdAndDate(userId: String, date: LocalDate): Leftover?

    @Query(
        value = "select * from leftover l where l.percentage>=0 and l.date=:date order by l.percentage", nativeQuery = true
    )
    fun getDailyRanking(date: LocalDate): List<Leftover>

    @Query(value="select sum(l.before) as served from leftover l where l.date=:date and l.course=:course", nativeQuery = true)
    fun getBeforeSumByDateAndCourse(date:LocalDate, course:Int): Long?

    @Query(value="select sum(l.after) as leftovers from leftover l where l.date=:date and l.course=:course", nativeQuery = true)
    fun getAfterSumByDateAndCourse(date:LocalDate, course:Int): Long?

    @Query(
        value = "SELECT * FROM leftover l WHERE l.date = :date AND l.percentage <= 0.2", nativeQuery = true
    )
    fun findByDateAndPercentage(date: LocalDate): List<Leftover>

}
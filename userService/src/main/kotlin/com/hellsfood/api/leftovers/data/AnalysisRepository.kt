package com.hellsfood.api.leftovers.data

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.LocalDate

interface AnalysisRepository : JpaRepository<Analysis, Long> {
    @Query(
        value = "select a from Analysis a where a.date>=:startDate and a.date<=:endDate"
    )
    fun getCourseInfoByDateRange(startDate: LocalDate, endDate: LocalDate): List<Analysis>
}
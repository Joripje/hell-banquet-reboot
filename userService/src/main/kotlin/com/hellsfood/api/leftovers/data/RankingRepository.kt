package com.hellsfood.api.leftovers.data

import org.springframework.data.jpa.repository.JpaRepository

interface RankingRepository : JpaRepository<Ranking, Long> {
    fun findByUserId(userId: String): Ranking?
}
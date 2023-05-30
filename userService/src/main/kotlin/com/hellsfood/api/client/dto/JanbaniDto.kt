package com.hellsfood.api.client.dto

import java.time.LocalDateTime

data class JanbaniDto(
    val id: Long,
    val userId: String,
    val feature: String,
    val janbanCode: String,
    val updatedAt: LocalDateTime
)
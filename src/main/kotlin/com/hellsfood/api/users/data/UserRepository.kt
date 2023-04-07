package com.hellsfood.api.users.data

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface UserRepository : JpaRepository<User, Long> {
    fun findByUserId(userId: String):User
    fun findIdByUserId(userId: String):Long

    @Query("SELECT u.userId from User u where u.email=:email")
    fun findUserIdByEmail(email: String?): Optional<String?>?
}
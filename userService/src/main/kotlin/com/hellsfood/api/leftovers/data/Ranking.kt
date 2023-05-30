package com.hellsfood.api.leftovers.data

import org.hibernate.annotations.DynamicInsert
import org.hibernate.annotations.DynamicUpdate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@DynamicInsert
@DynamicUpdate
@Entity
class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val rank: Long = 0

    @Column(length = 16)
    var userId: String? = null

    var leftPercentage: Double = 0.0
}
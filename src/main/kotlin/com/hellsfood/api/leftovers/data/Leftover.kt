package com.hellsfood.api.leftovers.data

import org.hibernate.annotations.DynamicInsert
import org.springframework.data.annotation.CreatedDate
import java.time.LocalDate
import javax.persistence.*

@DynamicInsert
@Entity
class Leftover {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(length = 16)
    lateinit var userId: String

    var before: Int = 0

    var after: Int = -1

    var percentage: Double = -1.0

    var course: Int = -1

    var propStatus: String = "not assigned"

    @CreatedDate
    var date: LocalDate = LocalDate.now()

}
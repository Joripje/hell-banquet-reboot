package com.hellsfood.api.leftovers.data

import org.hibernate.annotations.DynamicInsert
import org.springframework.data.annotation.CreatedDate
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@DynamicInsert
@Entity
class Analysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var served: Long = -1
    var leftovers: Long = -1

    var courseNo: Int=-1

    @CreatedDate
    var date: LocalDate = LocalDate.now()
}
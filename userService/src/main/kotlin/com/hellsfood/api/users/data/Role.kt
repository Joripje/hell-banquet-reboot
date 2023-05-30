package com.hellsfood.api.users.data

import com.fasterxml.jackson.annotation.JsonIgnore
import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.ToString
import org.hibernate.annotations.DynamicInsert
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToMany

@DynamicInsert
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
class Role {
    @Id
    private val id: Long? = null
    private val roleName: String? = null

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    @ToString.Exclude
    private val users: List<User>? = null
}
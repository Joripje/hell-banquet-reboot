package com.hellsfood.api.users.data

import com.fasterxml.jackson.annotation.JsonIgnore
import lombok.*
import org.hibernate.annotations.DynamicInsert
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.time.LocalDateTime
import javax.persistence.*

@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@ToString
@Embeddable
class User : UserDetails {
    @Id
    val id: Long? = null
    val userId: String? = null
    private val password: String? = null
    private val name: String? = null
    private val email: String? = null

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_role",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    ) // Many to Many인 경우 아래 두 개 어노테이션 안붙이면 무한 상호참조 -> StackOverflow 터짐.
    @JsonIgnore
    @ToString.Exclude
    private val roles: List<Role> = ArrayList()

    @Transient
    private val authorities: Collection<GrantedAuthority>? = null
    private val regTime: LocalDateTime? = null
    private val groupId: String? = null
    private val delFlag: LocalDateTime? = null
    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities!!
    }

    override fun getPassword(): String {
        return password!!
    }

    override fun getUsername(): String {
        return name!!
    }

    override fun isAccountNonExpired(): Boolean {
        return delFlag == null
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}
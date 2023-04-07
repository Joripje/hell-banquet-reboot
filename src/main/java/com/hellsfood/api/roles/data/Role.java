package com.hellsfood.api.roles.data;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hellsfood.api.auth.data.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@DynamicInsert
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Role {

	@Id
	private Long id;

	private String roleName;

	@ManyToMany(mappedBy = "roles")
	@JsonIgnore
	@ToString.Exclude
	private List<User> users;

	public Role(String roleName) {
		this.roleName = roleName;
	}
}

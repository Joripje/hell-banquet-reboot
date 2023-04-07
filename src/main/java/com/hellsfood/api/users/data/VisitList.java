package com.hellsfood.api.users.data;

import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "visitList")
@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
public class VisitList {
	@Id
	private String userId;

	private List<String> visitList;

}

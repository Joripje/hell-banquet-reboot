// package com.function.board.domain.user;
//
// import javax.persistence.Column;
// import javax.persistence.Entity;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// import javax.persistence.Id;
// import javax.persistence.Table;
//
// import org.hibernate.annotations.SQLDelete;
// import org.hibernate.annotations.Where;
//
// import com.function.board.domain.BaseTimeEntity;
//
// import lombok.AccessLevel;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
//
// @Getter
// @Entity
// @NoArgsConstructor(access = AccessLevel.PROTECTED)
// @Table(name = "user")
// @SQLDelete(sql = "UPDATE testdb.user SET is_deleted = true WHERE id=?")
// @Where(clause = "is_deleted = false")
// public class User extends BaseTimeEntity {
//
// 	@Id
// 	@GeneratedValue(strategy = GenerationType.IDENTITY)
// 	private Long id;
//
// 	@Column(name = "user_id", nullable = false)
// 	private String userId;
//
// }

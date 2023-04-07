package com.hellsfood.client.leftover;

import java.time.LocalDate;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Leftover {
	private Long id;
	private String userId;
	private int before;
	private int after;
	private double percentage;
	private int course;
	private String propStatus;
	private LocalDate date;
}

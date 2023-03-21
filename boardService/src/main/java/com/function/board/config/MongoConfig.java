package com.function.board.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

	@Value("${spring.data.mongodb.host}")
	private String host;

	@Value("${spring.data.mongodb.port}")
	private int port;

	@Value("${spring.data.mongodb.database}")
	private String database;

	@Override
	public MongoClient mongoClient() {
		return MongoClients.create(String.format("mongodb://%s:%d", host, port));
	}

	@Override
	protected String getDatabaseName() {
		return database;
	}
}

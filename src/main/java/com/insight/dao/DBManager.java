package com.insight.dao;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Arrays;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.stereotype.Component;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Component
public class DBManager {

	private @Value("${siteman.db.user}") String dbUserId;
	private @Value("${siteman.db.password}") String password;
	private @Value("${siteman.db.name}") String dbName;
	private @Value("${siteman.authdb.name}") String authDBName;
	private @Value("${siteman.db.host}") String dbHost;
	private @Value("${siteman.db.port}") int dbPort;

	UserCredentials userCredentials = new UserCredentials(dbUserId, password);

	MongoDbFactory dbFactory;
	MongoOperations mongoOperation;

	public DBManager() throws Exception {

	}

	@PostConstruct
	public void init() throws Exception {
		dbFactory = mongoDbFactory();
		mongoOperation = mongoTemplate();
	}

	private MongoDbFactory mongoDbFactory() throws Exception {

//		 MongoCredential credential =
//		 MongoCredential.createCredential(dbUserId, dbName,
//		 password.toCharArray());
		MongoCredential credential = MongoCredential.createCredential(dbUserId,
				dbName, password.toCharArray());
		ServerAddress serverAddress = new ServerAddress(dbHost, dbPort);

		// Mongo Client
		MongoClient mongoClient = new MongoClient(serverAddress,
				Arrays.asList(credential));

		// Mongo DB Factory
		SimpleMongoDbFactory simpleMongoDbFactory = new SimpleMongoDbFactory(
				mongoClient, dbName);

		return simpleMongoDbFactory;

//		 return new SimpleMongoDbFactory(new Mongo(dbHost,dbPort), dbName,
//		 userCredentials);
	}

	@SuppressWarnings("deprecation")
	private MongoTemplate mongoTemplate() throws Exception {
		MongoMappingContext mappingContext = new MongoMappingContext();
		MappingMongoConverter converter = new MappingMongoConverter(
				mongoDbFactory(), mappingContext);
		converter.setTypeMapper(new DefaultMongoTypeMapper(null));

		MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory(),
				converter);

		return mongoTemplate;
	}

	public void initForTestStub(String userId, String pwd, String dbName,
			String host, int port) {
		this.dbUserId = userId;
		this.password = pwd;
		this.dbName = dbName;
		this.authDBName = dbName;
		this.dbHost = host;
		this.dbPort = port;
	}

	public MongoOperations getMongoOperation() {
		return mongoOperation;
	}

	public void setMongoOperation(MongoOperations mongoOperation) {
		this.mongoOperation = mongoOperation;
	}

}

package com.insight.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.insight.constants.ColumnConstants;
import com.insight.web.ProcessResult;

public class BaseRepository<T> {

	@Autowired
	public DBOperations dbOperations;

	private Class<T> classType;

	public BaseRepository(Class<T> type) {
		this.classType = type;
	}

	public ProcessResult insertOne(Object obj, String collectionName)
			throws Exception {
		ProcessResult result = dbOperations.insertDocument(collectionName, obj);
		return result;
	}

	public ProcessResult update(Object obj, String collectionName)
			throws Exception {
		ProcessResult result = dbOperations.updateDocument(collectionName, obj);
		return result;
	}

	public ProcessResult delete(Object obj, String collectionName) {
		ProcessResult result = dbOperations.deleteOne(collectionName, obj);
		return result;
	}

	public T findById(String id) {
		T obj = dbOperations.getOneFromDBByKey(classType, ColumnConstants._ID,
				id);
		return obj;
	}

	public List<T> findAll() {
		List<T> list = dbOperations.getAllFromDB(classType);
		return list;
	}

}

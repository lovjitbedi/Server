package com.insight.dao;

import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.insight.constants.ColumnConstants;
import com.insight.constants.OperationType;
import com.insight.web.ProcessResult;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

@Component
public class DBOperations {

	@Autowired
	DBManager dbManager;

	public String Insert(String CollectionName, DBObject dbObj)
			throws Exception {
		dbManager.getMongoOperation().insert(dbObj, CollectionName);
		return CollectionName;
	}

	public <T> T getOneFromDBByKey(Class<T> t, String key, String value) {
		Query searchQuery = new Query(Criteria.where(key).is(value));
		T obj = dbManager.getMongoOperation().findOne(searchQuery, t);
		
		return obj;
	}

	public <T> T getOneFromDBByKey(String collectionName, Class<T> t,
			String key, String value) {
		Query searchQuery = new Query(Criteria.where(key).is(value));
		T obj = dbManager.getMongoOperation().findOne(searchQuery, t,
				collectionName);
		return obj;
	}

	public <T> List<T> getListFromDBByKey(Class<T> t, String key, Object value) {
		Query searchQuery = new Query(Criteria.where(key).is(value));
		List<T> list = dbManager.getMongoOperation().find(searchQuery, t);
		return list;
	}

	public <T> List<T> getListFromDBByKeyMap(Class<T> t,
			Map<String, Object> map, OperationType opType) {
		List<Criteria> criteriaList = new ArrayList<Criteria>();

		for (String key : map.keySet()) {
			criteriaList.add(Criteria.where(key).is(map.get(key)));
		}
		Query searchQuery = null;
		if (opType == OperationType.And) {
			searchQuery = new Query(new Criteria().andOperator(criteriaList
					.toArray(new Criteria[criteriaList.size()])));
		} else if (opType == OperationType.Or) {
			searchQuery = new Query(new Criteria().orOperator(criteriaList
					.toArray(new Criteria[criteriaList.size()])));
		}
		List<T> list = dbManager.getMongoOperation().find(searchQuery, t);
		return list;
	}

	public <T> List<T> getAllFromDB(Class<T> t) {
		List<T> list = dbManager.getMongoOperation().findAll(t);
		return list;
	}

	public ProcessResult insertDocument(String collectionName, Object obj)
			throws Exception {
		String uuid = addUUIDToObject(obj);
		dbManager.getMongoOperation().insert(obj, collectionName);
		return new ProcessResult(200, true, "Record inserted!", uuid);
	}

	public ProcessResult insertMultiDocument(String collectionName,
			List<Object> objList) throws Exception {

		dbManager.getMongoOperation().insert(objList, collectionName);
		return new ProcessResult(true, "Record inserted!");
	}

	public ProcessResult updateDocument(String collectionName, Object obj)
			throws Exception {
		// Query searchQuery = new Query(Criteria.where("_id").is(UUID));
		dbManager.getMongoOperation().save(obj, collectionName);
		return new ProcessResult(true, "Record updated!");
	}

	public ProcessResult deleteOne(String collectionName, Object obj) {
		WriteResult result = dbManager.getMongoOperation().remove(obj,
				collectionName);
		if (result.getN() <= 0) {
			return new ProcessResult(false, "Sorry! Delete failed.");
		}
		return new ProcessResult(true, "Record delted");
	}

	public ProcessResult deleteByKey(String collectionName, String key,
			Object value) {
		Query searchQuery = new Query(Criteria.where(key).is(value));
		WriteResult result = dbManager.getMongoOperation().remove(searchQuery,
				collectionName);
		if (result.getN() <= 0) {
			return new ProcessResult(false, "Sorry! Delete failed.");
		}
		return new ProcessResult(true, "Record delted");
	}

	public String getAll(String collectionName) throws Exception {
		List<DBObject> records = dbManager.getMongoOperation().findAll(
				DBObject.class, collectionName);
		return records.toString();
	}

	public ProcessResult insertDocument(String collectionName,
			Map<String, Object> userData) {
		ProcessResult result = new ProcessResult();

		try {
			dbManager.getMongoOperation().insert(userData, collectionName);
			result = new ProcessResult(200, true, "User inserted ");
		} catch (Exception e) {
			result = new ProcessResult(0, false,
					"Error while inserting data into " + collectionName);
			e.printStackTrace();
		}
		return result;
	}

	public ProcessResult updateDocument(String collectionName,
			Map<String, Object> userData) {
		ProcessResult result = new ProcessResult();
		try {
			Query query = new Query();
			query.addCriteria(Criteria.where("_id").is(userData.get("_id")));
			dbManager.getMongoOperation().updateFirst(query, (Update) userData,
					collectionName);
			result = new ProcessResult(200, true, "User inserted ");
		} catch (Exception e) {
			result = new ProcessResult(0, false,
					"Error while updating data into " + collectionName);
			e.printStackTrace();
		}
		return result;
	}

	public JSONArray findById(String Array[], String collectionName) {
		List<String> resultt = null;
		// DBObject result ;
		JSONArray jAry = new JSONArray();
		for (int idx = 0; idx < Array.length; idx++) {
			try {
				Query query = new Query();
				query.addCriteria(Criteria.where("_id").is(Array[idx]));
				List<DBObject> result = dbManager.getMongoOperation().find(
						query, DBObject.class, collectionName);
				System.out.println("result of find Operation is : " + result);
				JSONObject jObj = new JSONObject(result);
				jAry.put(result);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return jAry;
	}

	public void removeById(String id, String collectionName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(id));
		try {
			dbManager.getMongoOperation().remove(query, collectionName);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String addUUIDToObject(Object obj) throws Exception {
		Field field;
		Field fields[] = obj.getClass().getDeclaredFields();
		boolean flag = false;
		for (Field f : fields) {
			if ("id".equals(f.getName())) {
				flag = true;
				break;
			}
		}
		if (flag) {
			field = obj.getClass().getDeclaredField("id");
		} else {
			field = obj.getClass().getSuperclass().getDeclaredField("id");
		}
		String uuid = UUID.randomUUID().toString();
		field.setAccessible(true);
		field.set(obj, uuid);
		return uuid;

	}

	public DBManager getDbManager() {
		return dbManager;
	}

	public void setDbManager(DBManager dbManager) {
		this.dbManager = dbManager;
	}

	public JSONObject findById(String collectionName,String id) {
		  // DBObject result ;
		  JSONObject jObj = null;
		  try {
		    Query query = new Query();
		    query.addCriteria(Criteria.where("_id").is(id));
		    List<DBObject> result = dbManager.getMongoOperation().find(
		      query, DBObject.class, collectionName);
		    System.out.println("result of find Operation is : " + result);
		    jObj = new JSONObject(result);
//		    jAry.put(result);

		   } catch (Exception e) {
		    e.printStackTrace();
		   }
		return jObj;
		
		 }
}
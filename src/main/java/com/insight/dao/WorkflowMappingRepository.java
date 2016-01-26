package com.insight.dao;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.insight.domain.WorkflowMapping;

@Component
public class WorkflowMappingRepository extends BaseRepository<WorkflowMapping> {

	public WorkflowMappingRepository() {
		super(WorkflowMapping.class);
	}

	public WorkflowMapping findByObjectIdAndCollectionName(String objectId,
			String collectionName) {

		Query query = new Query(Criteria.where("objectId").is(objectId)
				.and("collectionName").is(collectionName));
		return dbOperations.getDbManager().getMongoOperation()
				.findOne(query, WorkflowMapping.class);
	}
}

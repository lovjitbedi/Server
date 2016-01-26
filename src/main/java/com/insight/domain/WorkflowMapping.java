package com.insight.domain;

import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "workflowMapping")
public class WorkflowMapping extends AbstractDocument {

	@Indexed(unique = true)
	String objectId;

	String collectionName;
	@Field(value="workFlowSqlId")
	List<String> workflowSqlId;

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getCollectionName() {
		return collectionName;
	}

	public void setCollectionName(String collectionName) {
		this.collectionName = collectionName;
	}

	public List<String> getWorkflowSqlId() {
		return workflowSqlId;
	}

	public void setWorkflowSqlId(List<String> workflowSqlId) {
		this.workflowSqlId = workflowSqlId;
	}

}

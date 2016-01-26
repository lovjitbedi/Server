package com.insight.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "criteria")
public class Criteria extends AbstractDocument {

	String query;
	String moduleName;
	String rawForm;
	// @Indexed(unique = true)
	String name;
	String description;
	String objectCode;

	public String getQuery() {
		return query;
	}

	public void setQuery(String query) {
		this.query = query;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getObjectCode() {
		return objectCode;
	}

	public void setObjectCode(String objectCode) {
		this.objectCode = objectCode;
	}

	public String getRawForm() {
		return rawForm;
	}

	public void setRawForm(String rawForm) {
		this.rawForm = rawForm;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}

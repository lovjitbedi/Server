package com.insight.domain;

import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role extends AbstractDocument {

	@Indexed(unique = true)
	String name;
	@Indexed(unique = true)
	String objectCode;
	String description;
	List<String> privilegeMasks;

	public String getObjectCode() {
		return objectCode;
	}

	public void setObjectCode(String objectCode) {
		this.objectCode = objectCode;
	}

	public List<String> getPrivilegeMasks() {
		return privilegeMasks;
	}

	public void setPrivilegeMasks(List<String> privilegeMasks) {
		this.privilegeMasks = privilegeMasks;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}

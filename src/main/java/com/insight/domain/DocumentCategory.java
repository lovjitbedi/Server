package com.insight.domain;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "documentCategory")
public class DocumentCategory extends AbstractDocument {

	@Indexed(unique = true)
	String name;

	@Indexed(unique = true)
	String objectCode;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getObjectCode() {
		return objectCode;
	}

	public void setObjectCode(String objectCode) {
		this.objectCode = objectCode;
	}

}

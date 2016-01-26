package com.insight.constants;

public enum OperationType {

	And("and"), Or("or"), Null(null);
	String title;

	private OperationType(String title) {
		this.title = title;
	}

	public String toString() {
		return title;
	}

	public static OperationType toAttributeType(String title) {
		switch (title) {
		case "and":
			return And;
		case "or":
			return Or;
		default:
			return Null;
		}
	}
}

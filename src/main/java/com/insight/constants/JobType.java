package com.insight.constants;

public enum JobType {

	ImportProjectSchedule("ImportProjectSchedule"), Null(null);
	String title;

	private JobType(String title) {
		this.title = title;
	}

	public String toString() {
		return title;
	}

	public static JobType toAttributeType(String title) {
		switch (title) {
		case "ImportProjectSchedule":
			return ImportProjectSchedule;
		default:
			return Null;
		}
	}
}

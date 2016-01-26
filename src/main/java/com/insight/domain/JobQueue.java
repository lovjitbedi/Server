package com.insight.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobQueue")
public class JobQueue extends AbstractDocument {

	String title;
	String description;
	Object objectId;
	String jobType;
	boolean active;
	boolean deleted;
	boolean sendEmailNotification;
	boolean sendAlertNotification;
	String scheduledJobId;
	String cronExpression;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Object getObjectId() {
		return objectId;
	}

	public void setObjectId(Object objectId) {
		this.objectId = objectId;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getScheduledJobId() {
		return scheduledJobId;
	}

	public void setScheduledJobId(String scheduledJobId) {
		this.scheduledJobId = scheduledJobId;
	}

	public String getCronExpression() {
		return cronExpression;
	}

	public void setCronExpression(String cronExpression) {
		this.cronExpression = cronExpression;
	}

	public boolean isSendEmailNotification() {
		return sendEmailNotification;
	}

	public void setSendEmailNotification(boolean sendEmailNotification) {
		this.sendEmailNotification = sendEmailNotification;
	}

	public boolean isSendAlertNotification() {
		return sendAlertNotification;
	}

	public void setSendAlertNotification(boolean sendAlertNotification) {
		this.sendAlertNotification = sendAlertNotification;
	}
}

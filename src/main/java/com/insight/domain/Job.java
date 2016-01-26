package com.insight.domain;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;//.newTrigger;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobs")
public class Job extends AbstractDocument {

	private String title;
	private String description;
	private String cronExpression;
	private boolean active;
	private String implementation;
	private String jobType;
	//private Date createdOn;
	//private String createdBy;
	private Date lastExecutedOn;
	private boolean lastExecutionStatus;
	private String lastExecutionStatusMessage;
	private int executionCount;
	private int successCount;
	private List<String> projectList;
	private boolean sendEmailNotification;
	private boolean sendAlertNotification;
	private boolean deleted;

	public void incrementCount(boolean success) {
		this.executionCount++;
		if (success)
			this.successCount++;
	}

	public JobDetail buildJobDetail() throws SchedulerException {
		// JobDetail job = new JobDetail();
		JobDetail job;

		// job.setName(getId());
		// job.setGroup("semscheduler");
		// job.setDescription(getName());
		JobDataMap jobMap = new JobDataMap();
		if (projectList != null && !projectList.isEmpty()) {
			jobMap.put("projectlist", projectList);
			// job.setJobDataMap(jobMap);
		}

		try {
			Class cls = Class.forName(implementation);
			job = JobBuilder.newJob(cls).withIdentity(getId(), "semscheduler")
					.usingJobData(jobMap).build();

			// job=newJob(Class.forName(implementation));
			// job.setJobClass(Class.forName(implementation));
			// System.out.println(this.implementation);
			// job.setJobClass(HelloJob.class);
		} catch (Exception e) {
			e.printStackTrace();
			throw new SchedulerException("Failed to load class <"
					+ implementation + ">", e);
		}
		// job.setRequestsRecovery(true);

		return job;
	}

	public JobDetail buildJobDetail(JobDataMap map) throws SchedulerException {
		JobDetail job = buildJobDetail();
		job.getJobDataMap().putAll(map);
		// job.setJobDataMap(map);

		return job;
	}

	public Trigger buildTrigger() throws ParseException {
		if (cronExpression != null && !cronExpression.isEmpty())
			return TriggerBuilder.newTrigger().withIdentity(id + "_trg", "semscheduler")
					.withSchedule(CronScheduleBuilder.cronSchedule(cronExpression)).build();
		else
			return TriggerBuilder.newTrigger().withIdentity(id + "_trg", "semscheduler")
					.startAt(new Date(System.currentTimeMillis() + 10000))
					.build();
		// return new CronTrigger(id + "_trg", "semscheduler", cronExpression);
	}
	
	
	

//	public Date getCreatedOn() {
//		return createdOn;
//	}
//
//	public void setCreatedOn(Date createdOn) {
//		this.createdOn = createdOn;
//	}

//	public String getCreatedBy() {
//		return createdBy;
//	}
//
//	public void setCreatedBy(String createdBy) {
//		this.createdBy = createdBy;
//	}
	

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

	public String getCronExpression() {
		return cronExpression;
	}

	public void setCronExpression(String cronExpression) {
		this.cronExpression = cronExpression;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getImplementation() {
		return implementation;
	}

	public void setImplementation(String implementation) {
		this.implementation = implementation;
	}

	public Date getLastExecutedOn() {
		return lastExecutedOn;
	}

	public void setLastExecutedOn(Date lastExecutedOn) {
		this.lastExecutedOn = lastExecutedOn;
	}

	public int getExecutionCount() {
		return executionCount;
	}

	public void setExecutionCount(int executionCount) {
		this.executionCount = executionCount;
	}

	public int getSuccessCount() {
		return successCount;
	}

	public void setSuccessCount(int successCount) {
		this.successCount = successCount;
	}

	public List<String> getProjectList() {
		return projectList;
	}

	public void setProjectList(List<String> projectList) {
		this.projectList = projectList;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public boolean isLastExecutionStatus() {
		return lastExecutionStatus;
	}

	public void setLastExecutionStatus(boolean lastExecutionStatus) {
		this.lastExecutionStatus = lastExecutionStatus;
	}

	public String getLastExecutionStatusMessage() {
		return lastExecutionStatusMessage;
	}

	public void setLastExecutionStatusMessage(String lastExecutionStatusMessage) {
		this.lastExecutionStatusMessage = lastExecutionStatusMessage;
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

package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Job;

@Component
public class JobRepository extends BaseRepository<Job> {

	public JobRepository() {
		super(Job.class);
	}

}

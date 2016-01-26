package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Project;

@Component
public class ProjectRepository extends BaseRepository<Project> {
	public ProjectRepository() {
		super(Project.class);
	}
}

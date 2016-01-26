package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Criteria;

@Component
public class CriteriaRepository extends BaseRepository<Criteria> {
	public CriteriaRepository() {
		super(Criteria.class);
	}
	
}

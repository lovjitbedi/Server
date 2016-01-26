package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Lists;

@Component
public class ListRepository extends BaseRepository<Lists> {

	public ListRepository() {
		super(Lists.class);
	}
}



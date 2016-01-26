package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Resource;


@Component
public class ResourceRepository extends BaseRepository<Resource> {
	public ResourceRepository() {
		super(Resource.class);
		// TODO Auto-generated constructor stub
	}

	

}

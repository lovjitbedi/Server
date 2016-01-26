package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Privilege;

@Component
public class PrivilegeRepository extends BaseRepository<Privilege> {
	public PrivilegeRepository() {
		super(Privilege.class);
	}
}

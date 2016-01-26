package com.insight.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.insight.constants.ColumnConstants;
import com.insight.domain.Role;

@Component
public class RoleRepository extends BaseRepository<Role> {

	public RoleRepository() {
		super(Role.class);
	}

	public List<Role> findByPrivilegeMaskId(String id) {
		List<Role> list = dbOperations.getListFromDBByKey(Role.class,
				ColumnConstants.PRIVILEGEMASK_ID, id);
		return list;

	}
}

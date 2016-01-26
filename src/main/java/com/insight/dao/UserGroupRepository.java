package com.insight.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.insight.constants.ColumnConstants;
import com.insight.domain.UserGroup;

@Component
public class UserGroupRepository extends BaseRepository<UserGroup> {

	public UserGroupRepository() {
		super(UserGroup.class);
	}

	public List<UserGroup> findByRoleId(String id) {
		List<UserGroup> list = dbOperations.getListFromDBByKey(UserGroup.class,
				ColumnConstants.ROLES_ID, id);
		return list;

	}

}

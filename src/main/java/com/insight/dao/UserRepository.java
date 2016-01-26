package com.insight.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.insight.constants.ColumnConstants;
import com.insight.domain.User;

@Component
public class UserRepository extends BaseRepository<User> {

	public UserRepository() {
		super(User.class);
	}

	public List<User> findByUserGroupId(String id) {
		List<User> list = dbOperations.getListFromDBByKey(User.class,
				ColumnConstants.USERGROUP_ID, id);
		return list;

	}

}

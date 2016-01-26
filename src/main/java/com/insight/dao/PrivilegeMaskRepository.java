package com.insight.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.insight.constants.ColumnConstants;
import com.insight.domain.PrivilegeMask;

@Component
public class PrivilegeMaskRepository extends BaseRepository<PrivilegeMask> {

	public PrivilegeMaskRepository() {
		super(PrivilegeMask.class);

	}

	public List<PrivilegeMask> findByCriteriaId(String id) {
		List<PrivilegeMask> list = dbOperations.getListFromDBByKey(
				PrivilegeMask.class, ColumnConstants.CRITERIA_ID, id);
		return list;
	}

	public PrivilegeMask findByAlternateId(String field, String value) {
		PrivilegeMask obj = dbOperations.getOneFromDBByKey(PrivilegeMask.class,
				field, value);
		return obj;
	}

}

package com.insight.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.insight.dao.DBOperations;
import com.insight.security.SecurityUtils;

public class BaseService {

	@Autowired
	public DBOperations dbOperation;

	@Autowired
	protected SecurityUtils securityUtils;

}

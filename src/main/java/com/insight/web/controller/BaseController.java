package com.insight.web.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.insight.security.SecurityUtils;

public class BaseController {

	@Autowired
	protected SecurityUtils securityUtils;
	
	
}

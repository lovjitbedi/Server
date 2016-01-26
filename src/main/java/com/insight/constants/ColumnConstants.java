package com.insight.constants;

import java.util.Stack;

public interface ColumnConstants {
	// Common Constants
	String OBJECTID = "objectId";
	String TITLE = "title";
	String DESCRIPTION = "description";
	String REFPROJECTID = "refProjectId";
	String PROJECTID = "projectId";
	String _ID = "_id";
	//String ID = "id";
	
	String NAME = "name";
	String USERID = "userId";
	String CRITERIA_ID = "criteriaId";
	String PRIVILEGE_ID = "privilegeId";

	String PRIVILEGEMASK_ID = "privilegeMasks";
	String ROLES_ID = "roles";
	String USERGROUP_ID = "userGroups";
	String VENDOR_ID = "vendorId";
	
	String JBPM_USER_TABLE_NAME = "JBPM4_ID_USER";
	String JBPM_USERGROUP_TABLE_NAME = "JBPM4_ID_GROUP";
	
	Stack<String> referrer = new Stack<String>();
	String ACTIVE="active";
	
	
	//ACTIVITY_RESOURCE_ASSIGNMENT
	
	
	//Activity
	String MASTER_DATA="masterData";
}

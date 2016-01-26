package com.insight.domain;

import java.util.Date;

import com.insight.security.SecurityUtils;

public class AbstractDocument {

	protected String id;

	protected Date createdOn;
	protected String createdBy;
	protected Date modifiedOn;
	protected String modifiedBy;

	public AbstractDocument(){
		createdOn=new Date();
		modifiedOn=new Date();
		createdBy=modifiedBy=getLoggedUserId();
		//createdBy=modifiedBy="admin";
	}
	private String getLoggedUserId(){
		try{
		return  SecurityUtils.getLoggedUserId() == null ? "" : SecurityUtils.getLoggedUserId();
		}catch(Exception ex){
			return "";
		}
	}
	/**
	 * Returns the identifier of the document.
	 * 
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

	public Date getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(Date modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

//	@Override
//	public boolean equals(Object obj) {
//
//		if (this == obj) {
//			return true;
//		}
//
//		if (this.id == null || obj == null
//				|| !(this.getClass().equals(obj.getClass()))) {
//			return false;
//		}
//
//		AbstractDocument that = (AbstractDocument) obj;
//
//		return this.id.equals(that.getId());
//	}
//
//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see java.lang.Object#hashCode()
//	 */
//	@Override
//	public int hashCode() {
//		return id == null ? 0 : id.hashCode();
//	}
}

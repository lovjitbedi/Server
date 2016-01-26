package com.insight.domain;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "contact")
public class Contact extends AbstractDocument {
	
	
	String address;
	String email;
	String name;
	String phoneNo;
	String vendorId;
	
	
	
	

	public void setModifiedOn(Date date) {
		// TODO Auto-generated method stub
		
	}

	public void setModifiedBy(String loggedUserId) {
		// TODO Auto-generated method stub
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

}

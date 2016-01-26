package com.insight.dao;

import java.util.List;

import org.springframework.stereotype.Component;

import com.insight.domain.Contact;

@Component
public class ContactRepository extends BaseRepository<Contact> {
	public ContactRepository() {
		super(Contact.class);
	}

	public List<Contact> findListByKey(String key, Object value) {
		List<Contact> list = dbOperations.getListFromDBByKey(Contact.class,
				key, value);
		return list;
	}

}

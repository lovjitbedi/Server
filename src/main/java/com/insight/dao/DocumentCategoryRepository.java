package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.DocumentCategory;

@Component
public class DocumentCategoryRepository extends BaseRepository<DocumentCategory> {
	public DocumentCategoryRepository() {
		super(DocumentCategory.class);
	}
}

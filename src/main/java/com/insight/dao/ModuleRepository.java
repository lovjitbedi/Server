package com.insight.dao;

import org.springframework.stereotype.Component;

import com.insight.domain.Module;

@Component
public class ModuleRepository extends BaseRepository<Module> {
	public ModuleRepository() {
		super(Module.class);
	}
}

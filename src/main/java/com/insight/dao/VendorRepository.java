package com.insight.dao;

import org.springframework.stereotype.Component;
import com.insight.domain.Vendor;


@Component
public class VendorRepository extends BaseRepository<Vendor> {
	public VendorRepository() {
		super(Vendor.class);
	}
}

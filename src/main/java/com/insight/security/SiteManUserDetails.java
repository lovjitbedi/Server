package com.insight.security;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class SiteManUserDetails extends User {
	private static final long serialVersionUID = 1L;

	String userUUId;
	String userFullName;
	String userEmail;

	public SiteManUserDetails(String userId, String password, boolean enabled,
			boolean accountNonExpired, boolean credentialsNonExpired,
			boolean accountNonLocked, List<GrantedAuthority> authList,
			com.insight.domain.User user) {

		super(userId, password, enabled, accountNonExpired,
				credentialsNonExpired, accountNonLocked, authList);

		this.userUUId = user.getId();
		this.userFullName = user.getName();
		this.userEmail = user.getEmail();
	}

	public String getUserUUId() {
		return userUUId;
	}

	public void setUserUUId(String userUUId) {
		this.userUUId = userUUId;
	}

	public String getUserFullName() {
		return userFullName;
	}

	public void setUserFullName(String userFullName) {
		this.userFullName = userFullName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
}

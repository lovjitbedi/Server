package com.insight.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.insight.constants.ColumnConstants;
import com.insight.domain.User;
import com.insight.domain.UserGroup;
import com.insight.service.BaseService;

@Service
public class MongoUserDetailsService extends BaseService implements
		UserDetailsService {

	private @Value("${usergroup.admin.name}") String adminGroupName;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {

		User user = dbOperation.getOneFromDBByKey(User.class,
				ColumnConstants.USERID, username);

		if (user != null && isAdmin(user)) {
			boolean enabled = true;
			boolean accountNonExpired = true;
			boolean credentialsNonExpired = true;
			boolean accountNonLocked = true;

			SiteManUserDetails userdetails = new SiteManUserDetails(
					user.getUserId(), user.getPassword(), enabled,
					accountNonExpired, credentialsNonExpired, accountNonLocked,
					getAuthorities(user.getRoles()), user);
			return userdetails;
		} else {
			throw new UsernameNotFoundException("Invalid user name ["
					+ username + "]");
		}
	}

	// private void initializeUserPrivileges(String userId) {
	// userSession.initialize(userId);
	// }

	private boolean isAdmin(User user) {
		if (user.getUserGroups() == null || user.getUserGroups().size() <= 0)
			return false;
		if (adminGroupName.isEmpty()) {
			System.out.println("Admin User group variable not set.");
			return false;
		}
		UserGroup group = dbOperation.getOneFromDBByKey(UserGroup.class,
				"name", adminGroupName);
		if (group == null)
			return false;
		if (user.getUserGroups().contains(group.getId())) {
			return true;
		}
		return false;
	}

	public List<GrantedAuthority> getAuthorities(List<String> roleList) {

		// Bson bson = dbOperation.getQueryBuilder().buildFlatCondition(
		// new JSONObject().put("operator", "in").put("key", "_id")
		// .put("value", jRoles));
		// JSONArray rolesList = dbOperation.getListByQuery(
		// CollectionConstants.ROLES, bson);

		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		// for (int idx = 0; idx < rolesList.length(); idx++) {
		// String roleName = rolesList.getJSONObject(idx).getString("name");
		// authList.add(new SimpleGrantedAuthority(roleName.toUpperCase()));
		// }

		return authList;
	}
	// @Override
	// public UserDetails loadUserByUsername(String userName)
	// throws UsernameNotFoundException {
	// UserDetails loadedUser;
	//
	// String str = dbOperations.getByKey("user", "username", username);
	// JSONObject jObj = new JSONObject(str);
	// List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
	// SimpleGrantedAuthority a = new SimpleGrantedAuthority("ROLE_ADMIN");
	// roles.add(a);
	//
	// List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
	// SimpleGrantedAuthority a = new SimpleGrantedAuthority("ROLES_ADMIN");
	// roles.add(a);
	// loadedUser = new User("rajiv", "jain", roles);
	//
	// return loadedUser;
	// }
}

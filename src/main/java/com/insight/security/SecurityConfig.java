package com.insight.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private MongoUserDetailsService mongoUserDetailsService;

	// @Autowired
	// public void configureGlobal(AuthenticationManagerBuilder auth)
	// throws Exception {
	// auth.inMemoryAuthentication().withUser("user").password("password")
	// .roles("USER").and().withUser("admin").password("admin123")
	// .roles("USER", "ADMIN");
	//
	// }

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/js/**", "/css/**", "/components/**",
				"/css/**", "/images/**", "/scripts/**");

	}

	// @Autowired
	// public void configAuthentication(AuthenticationManagerBuilder auth)
	// throws Exception {
	//
	// auth.jdbcAuthentication()
	// .dataSource(dataSource)
	// .usersByUsernameQuery(
	// "select username,password, enabled from users where username=?")
	// .authoritiesByUsernameQuery(
	// "select username, role from user_roles where username=?");
	// }

	// @Override
	// protected void configure(HttpSecurity http) throws Exception {
	//
	// http.authorizeRequests().antMatchers("/admin/**")
	// .access("hasRole('ROLE_ADMIN')").and().formLogin()
	// .loginPage("/login").failureUrl("/login?error")
	// .usernameParameter("username").passwordParameter("password")
	// .and().logout().logoutSuccessUrl("/login?logout").and()
	// .exceptionHandling().accessDeniedPage("/403").and().csrf();
	// }

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.formLogin()
				.loginPage("/login")
				.permitAll()
				.defaultSuccessUrl("/admin")
				.and()
				.logout()
				.permitAll()
				.and()
				.authorizeRequests()
				.antMatchers("/index", "/home.html", "/login", "/", "/access",
						"/logout", "/test", "/testdata", "/cache/*","/integration/*")
				.permitAll().anyRequest().authenticated().and().csrf()
				.disable().exceptionHandling().accessDeniedPage("/403");
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.userDetailsService(mongoUserDetailsService);
		// auth.authenticationProvider(mongoDBAuthenticationProvider); //
		// .userDetailsService(mongoUserDetailsService);

	}
}

package com.insight.web;

import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan("com.insight")
public class SitemanAdminApplication {

	

	public static void main(String[] args) {
		SpringApplication.run(SitemanAdminApplication.class, args);
	}

	// @Bean
	// public SpringBeanJobFactory springBeanJobFactory() {
	// AutowiringSpringBeanJobFactory jobFactory = new
	// AutowiringSpringBeanJobFactory();
	// jobFactory.setApplicationContext(applicationContext);
	// return jobFactory;
	// }

	@Bean
	public SchedulerFactory schedulerFactory() {
		return new StdSchedulerFactory();
	}

	// public SchedulerFactoryBean schedulerFactory() {
	// SchedulerFactoryBean quartzScheduler = new SchedulerFactoryBean();
	//
	// AutowiringSpringBeanJobFactory jobFactory = new
	// AutowiringSpringBeanJobFactory();
	// jobFactory.setApplicationContext(applicationContext);
	// quartzScheduler.setJobFactory(jobFactory);
	// return quartzScheduler;
	// }
}

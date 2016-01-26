package com.insight.web;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class SpringMailServiceConfig {	
	
	  private @Value("${mail.smtp.host}") String SMTP_HOST ;

	  private @Value("${mail.smtp.protocol}") String SMTP_PROTOCOL;
	  
	  private @Value("${mail.smtp.port}")String SMTP_PORT;

	  private @Value("${mail.smtp.username}")  String SMTP_USERNAME;

	  private @Value("${mail.smtp.password}") String SMTP_PASSWORD;

	  private @Value("${mail.smtp.auth}") String SMTP_AUTH;

	  private @Value("${mail.debug}") String MAIL_DEBUG;
	  private @Value("${mail.smtp.ssl.enable}") String SMTP_SSL_ENABLED;

	  private @Value("${mail.smtp.starttls.enable}") String SMTP_START_TLS_ENABLED;

	  private @Value("${mail.smtp.starttls.required}") String SMTP_START_TLS_REQUIRED;
	  
	  private @Value("${mail.template.path}") String MAIL_TEMPLATE_PATH;
	  
	  
	
	  @Bean
	  public JavaMailSenderImpl javaMailSender()
	  {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    Properties javaMailProperties = new Properties();
	    javaMailProperties.put("mail.smtp.auth",SMTP_AUTH);
	    javaMailProperties.put("mail.smtp.starttls.enable",SMTP_START_TLS_ENABLED);
	    javaMailProperties.put("mail.smtp.ssl.enable",SMTP_SSL_ENABLED);
	    javaMailProperties.put("mail.smtp.starttls.required",SMTP_START_TLS_REQUIRED);
	    javaMailProperties.put("mail.debug",MAIL_DEBUG);
	    
//	    javaMailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//	    javaMailProperties.put("mail.smtp.socketFactory.fallback", "false");

	    mailSender.setJavaMailProperties(javaMailProperties);

	    mailSender.setHost(SMTP_HOST);
	    mailSender.setPassword(SMTP_PASSWORD);
	    mailSender.setPort(Integer.parseInt(SMTP_PORT));
	    mailSender.setProtocol(SMTP_PROTOCOL);
	    mailSender.setUsername(SMTP_USERNAME);

	    return mailSender;
	  }

}

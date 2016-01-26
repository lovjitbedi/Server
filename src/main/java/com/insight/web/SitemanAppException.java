package com.insight.web;

public class SitemanAppException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public SitemanAppException(String message) {
		super(message);
	}

	public SitemanAppException(String message, Throwable e) {
		super(message, e);
	}

}

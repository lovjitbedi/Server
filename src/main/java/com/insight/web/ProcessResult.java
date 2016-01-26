package com.insight.web;

import org.json.JSONObject;

public class ProcessResult {

	private int code;
	private boolean status;
	private String message;
	private String data;

	public ProcessResult() {
	}

	public ProcessResult(boolean _status, String _msg) {
		this.status = _status;
		this.message = _msg;
	}

	public ProcessResult(int code, boolean _status, String _msg) {
		this(_status, _msg);
		this.code = code;
	}

	public ProcessResult(int code, boolean _status, String _msg, String data) {
		this(code, _status, _msg);
		this.data = data;
	}

	public int isCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public JSONObject toJSON() {
		JSONObject jObj = new JSONObject();
		jObj.put("code", this.code);
		jObj.put("success", this.getStatus());
		jObj.put("message", this.getMessage());
		jObj.put("data", this.data);
		return jObj;
	}

}

package com.insight.web.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
//import com.insight.job.services.BulkDocumentUpload;

import com.insight.security.SiteManUserDetails;

@Controller
public class WelcomeController extends BaseController {}

package com.insight.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "resource")
public class Resource extends AbstractDocument{
 

 String title;
 String objectCode;
 String objectId;
 String parentObjectId;
 String resourceType;
 String resourceTypeCode;
 String defaultUnitsPerTime;
 String uomObjectId;
 String semResource;
 String active;
 public String getTitle() {
  return title;
 }
 public String getObjectCode() {
  return objectCode;
 }
 public String getObjectId() {
  return objectId;
 }
 public String getParentObjectId() {
  return parentObjectId;
 }
 public String getResourceType() {
  return resourceType;
 }
 public String getResourceTypeCode() {
  return resourceTypeCode;
 }
 public String getDefaultUnitsPerTime() {
  return defaultUnitsPerTime;
 }
 public String getUomObjectId() {
  return uomObjectId;
 }
 public String getSemResource() {
  return semResource;
 }
 public String getActive() {
  return active;
 }
 
 
 


}
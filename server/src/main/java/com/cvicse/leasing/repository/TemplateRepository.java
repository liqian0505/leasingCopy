package com.cvicse.leasing.repository;

import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.model.Template;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.mongodb.repository.MongoRepository;


@JaversSpringDataAuditable
public interface TemplateRepository extends MongoRepository<Template, String> {

    Template findByContent(JSONObject content);
}
package com.cvicse.leasing.repository;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.model.Contract;
import com.cvicse.leasing.model.Template;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @authored by TC.
 * */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TemplateRepositoryTests {
    @Autowired
    TemplateRepository templateRepository;

    Template t1, t2;

    @Before
    public void setUp() {

        templateRepository.deleteAll();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content","T1");
        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("content","T2");
        t1 = templateRepository.save(new Template(jsonObject));
        t2 = templateRepository.save(new Template(jsonObject1));
    }

    @Test
    public void setsIdOnSave() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content","T1");
        Template t1 = templateRepository.save(new Template(jsonObject));
        assertThat(t1.getId()).isNotNull();
    }

    @Test
    public void findByContent(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content","T1");
        Template template = templateRepository.findByContent(jsonObject);
        assertThat(template.getId()).isNotNull();
    }


}

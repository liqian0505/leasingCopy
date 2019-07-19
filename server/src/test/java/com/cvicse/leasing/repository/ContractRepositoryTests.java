package com.cvicse.leasing.repository;

import static org.assertj.core.api.Assertions.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.model.Contract;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ContractRepositoryTests {

    @Autowired
    ContractRepository repository;

    Contract c1, c2;

    @Before
    public void setUp() {

        repository.deleteAll();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content","C1");
        JSONObject jsonObject1 = new JSONObject();
        jsonObject1.put("content","C2");
        c1 = repository.save(new Contract(jsonObject));
        c2 = repository.save(new Contract(jsonObject1));
    }

    @Test
    public void setsIdOnSave() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content","C1");
        Contract c1 = repository.save(new Contract(jsonObject));
        assertThat(c1.id).isNotNull();
    }

    @Test
    public void findsByName() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("content","C1");
        Contract result = repository.findByContent(jsonObject);
        assertThat(result.getId()).isNotNull();
        //assertThat(result).extracting("content").contains({"content"="C1"});
    }

}

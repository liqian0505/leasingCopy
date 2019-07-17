package com.cvicse.leasing.repository;

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

        t1 = templateRepository.save(new Template("T1"));
        t2 = templateRepository.save(new Template("T2"));
    }

    @Test
    public void setsIdOnSave() {
        Template t1 = templateRepository.save(new Template("T1"));
        assertThat(t1.getId()).isNotNull();
    }

    @Test
    public void findByContent(){
        Template template = templateRepository.findByName("T1");
        assertThat(template.getId()).isNotNull();
    }


}

package com.cvicse.leasing.service;

import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.TemplateRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TemplateServiceTests {

    @Autowired
    TemplateService templateService;

    @MockBean
    TemplateRepository repository;

    @Before
    public void setUp(){
        repository.deleteAll();
        Template template1=new Template("T1");
        template1.setId("1");
        Template template2 = new Template("T2");
        template2.setId("2");
        List<Template> allTemplates = Arrays.asList(template1, template2);
        Mockito.when(repository.findById(template1.getId())).thenReturn(Optional.of(template1));
        Mockito.when(repository.findById(template2.getId())).thenReturn(Optional.of(template2));
        Mockito.when(repository.findById("wrong_id")).thenReturn(null);
        Mockito.when(repository.save(new Template("T2"))).thenReturn(template2);
        Mockito.when(repository.findAll()).thenReturn(allTemplates);
    }

    @Test
    public void given2Templates_when_getAllTemplates_thenReturn2Records() {
        Template Template1=new Template("T1");
        Template Template2 = new Template("T2");
        List<Template> TemplateList= templateService.getAllTemplate();
        assertThat(TemplateList).hasSize(2).extracting(Template::getContent).contains(Template1.getContent(),Template2.getContent());
    }

    @Test
    public void givenRightTemplateId_thenReturnTemplate(){
        Template template =templateService.getTemplate("1");
        assertThat(template).extracting("content").contains("T1");
    }

    @Test
    public void createNewTemplate_thenReturnTheTemplate(){
        Template template = templateService.createTemplate(new Template("T2"));
        assertThat(template).extracting("content").contains("T2");
    }

    @Test
    public void updateExistedTemplate_withExistedId_andNewName_thenReturnTheTemplate(){
        Template template =templateService.updateTemplate(new Template("T3"),"1");
        assertThat(template.content.equals("T3")).isTrue();
    }

//    @Test
//    public void deleteTemplate(){
//        TemplateService.deleteTemplate(repository.findByName("C1").id);
//        assertThat(repository.findByName("C1")).isNull();
//    }
}

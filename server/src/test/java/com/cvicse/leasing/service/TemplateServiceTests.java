package com.cvicse.leasing.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cvicse.leasing.exception.TemplateNotFoundException;
import com.cvicse.leasing.model.Template;
import com.cvicse.leasing.repository.TemplateRepository;
import com.google.gson.JsonObject;
import org.javers.core.Changes;
import org.javers.core.diff.Change;
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

//    @MockBean
//    TemplateRepository repository;
//
//    @Autowired
//    TemplateRepository templateRepository;
//
//    @Before
//    public void setUp(){
//        repository.deleteAll();
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","T1");
//        TemplateRequest template1=new TemplateRequest(jsonObject);
//        template1.setId("1");
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","T2");
//        TemplateRequest template2 = new TemplateRequest(jsonObject1);
//        template2.setId("2");
//        JSONObject jsonObject2 = new JSONObject();
//        jsonObject2.put("content","T2");
//        List<TemplateRequest> allTemplates = Arrays.asList(template1, template2);
//        Mockito.when(repository.findById(template1.getId())).thenReturn(Optional.of(template1));
//        Mockito.when(repository.findById(template2.getId())).thenReturn(Optional.of(template2));
//        Mockito.when(repository.findById("wrong_id")).thenReturn(null);
//        Mockito.when(repository.save(new TemplateRequest(jsonObject2))).thenReturn(template2);
//        Mockito.when(repository.findAll()).thenReturn(allTemplates);
//    }
//
//    @Test
//    public void given2Templates_when_getAllTemplates_thenReturn2Records() {
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","T1");
//        TemplateRequest template1=new TemplateRequest(jsonObject);
//
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","T2");
//        TemplateRequest template2 = new TemplateRequest(jsonObject1);
//
//
//        List<TemplateRequest> TemplateList= templateService.getAllTemplate();
//        assertThat(TemplateList).hasSize(2).extracting(TemplateRequest::getContent).contains(template1.getContent(),template2.getContent());
//
//    }
//
//    @Test
//    public void givenRightTemplateId_thenReturnTemplate() throws TemplateNotFoundException {
//        TemplateRequest template =templateService.getTemplate("1");
//        assertThat(template).extracting("content").contains("T1");
//    }
//
//    @Test
//    public void createNewTemplate_thenReturnTheTemplate() throws TemplateNotFoundException{
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","T2");
//        templateService.createTemplate(new TemplateRequest(jsonObject1));
//        TemplateRequest template = templateService.getTemplate("2");
//        assertThat(template).extracting("content").contains("T2");
//    }
//
//    @Test
//    public void updateExistedTemplate_withExistedId_andNewName_thenReturnTheTemplate(){
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","T2");
//        TemplateRequest template =templateService.updateTemplate(jsonObject1,"1");
//        assertThat(template.content.equals("T2")).isTrue();
//    }

//    @Test
//    public void testUpdateHistory() throws TemplateNotFoundException{
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("content","T2");
//        Template template = templateService.createTemplate(new Template(jsonObject));
//        JSONObject jsonObject1 = new JSONObject();
//        jsonObject1.put("content","T3");
//        templateService.updateTemplate(jsonObject1,template.getId());
//        JSONObject jsonObject2 = new JSONObject();
//        jsonObject2.put("content","T4");
//        templateService.updateTemplate(jsonObject2,template.getId());
//       JSONArray jsonArray =templateService.trackTemplateChangesWithJavers(template.getId());
//       Template template1 = templateService.getTemplateWithJaversCommitId(template.getId(),"3");
//       System.out.println(template1.toString());
//        System.out.println(jsonArray);
//    }


//    @Test
//    public void deleteTemplate(){
//        TemplateService.deleteTemplate(repository.findByName("C1").id);
//        assertThat(repository.findByName("C1")).isNull();
//    }
}

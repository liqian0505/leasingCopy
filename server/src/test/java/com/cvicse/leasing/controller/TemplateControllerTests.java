//package com.cvicse.leasing.controller;
//
//import com.cvicse.leasing.model.Template;
//import com.cvicse.leasing.service.TemplateService;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.mockito.internal.verification.VerificationModeFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.reset;
//import static org.mockito.Mockito.verify;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@RunWith(SpringRunner.class)
//@WebMvcTest(TemplateController.class)
//public class TemplateControllerTests {
//    @Autowired
//    private MockMvc mvc;
//
//    @MockBean
//    private TemplateService templateService;
//
//    @Before
//    public void setUp() throws Exception {
//    }
////
////    @Test
////    public void whenPostTemplate_thenCreateTemplate() throws Exception{
////        Template template = new Template("T1");
////        given(templateService.createTemplate(Mockito.any())).willReturn(template);
////        mvc.perform(post("/api/templates")
////                .contentType(MediaType.APPLICATION_JSON)
////                .content(JsonUtil.toJson(template)))
////                .andExpect(status().is(200))
////                .andExpect(jsonPath("$.content").value("T1"));
////        verify(templateService, VerificationModeFactory.times(1)).createTemplate(Mockito.any());
////        reset(templateService);
////    }
//
//    @Test
//    public void whenGetTemplates_thenGetTemplates() throws Exception{
//        Template template1 = new Template("T1");
//        Template template2 = new Template("T2");
//        List<Template> templateList = Arrays.asList(template1,template2);
//        given(templateService.getAllTemplate()).willReturn(templateList);
//
//        mvc.perform(get("/api/templates")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().is(200))
//                .andExpect(jsonPath("$[0].content").value("T1"))
//                .andExpect(jsonPath("$[1].content").value("T2"));
//        verify(templateService,VerificationModeFactory.times(1)).getAllTemplate();
//        reset(templateService);
//    }
//}

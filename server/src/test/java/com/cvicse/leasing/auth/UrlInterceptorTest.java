package com.cvicse.leasing.auth;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureWebMvc
@AutoConfigureMockMvc
public class UrlInterceptorTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void urlAuthTest() throws Exception {
        //正确的cookie
        mockMvc.perform(get("/api/contracts")
                .cookie(new Cookie("username", "A")))
                .andExpect(status().isOk());
        //错误的cookie， 返回 forbidden
        mockMvc.perform(get("/api/templates")
                .cookie(new Cookie("username","A")))
                .andExpect(status().isForbidden());
    }
}

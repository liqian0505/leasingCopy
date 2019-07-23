package com.cvicse.leasing.auth;

import com.cvicse.leasing.config.AuthConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConfigTest {
    @Autowired
    private AuthConfig authConfig;

    @Test
    public void contextLoads() {
        //暂时只进行读取测试
        System.out.print(authConfig.getRedirectionList());
//        AuthConfig authConfig = AuthConfig.getConfiguration();
//        System.out.print(authConfig.getRedirectionList());
    }
}

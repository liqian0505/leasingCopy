package com.cvicse.leasing.config;

import com.cvicse.leasing.framwork.UrlInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private UrlInterceptor urlInterceptor;

    @Bean
    public WebMvcConfigurerAdapter forwardToIndex() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/").setViewName("forward:/index.html");
            }
        };
    }

    /**
     * 迭代1 : 重载拦截器
     * 此后重构：拦截器动态加载
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // addPathPatterns("/api/**") 表示拦截所有/api 下的请求，
        // excludePathPatterns("/login", "/register") 表示除了登陆与注册之外，因为登陆注册不需要登陆也可以访问
        registry.addInterceptor(urlInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/login", "/register", "/");
    }
}

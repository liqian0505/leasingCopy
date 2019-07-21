package com.cvicse.leasing.framwork;


import com.cvicse.leasing.config.AuthConfig;
import com.cvicse.leasing.model.UserModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;


/**
 * 迭代1 : 初步实现url层面简单的拦截
 */
@Component
public class UrlInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(UrlInterceptor.class);
    @Autowired
    private AuthConfig authConfig;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        logger.info("进入url拦截器，请求uri : " + httpServletRequest.getRequestURI());
        Cookie[] cookies = httpServletRequest.getCookies();
        if (cookies == null || cookies.length == 0) {
            httpServletResponse.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }
        //接口中直接放入username 的cookie 即可
        String userName = Arrays.stream(cookies)
                .filter(item -> item.getName().equals("username"))
                .findFirst()
                .get()
                .getValue();
        Iterator<UserModel> iterator = authConfig.getRedirectionList();
        UserModel target = null;
        while (iterator.hasNext()) {
            UserModel tmpModel = iterator.next();
            if (tmpModel.getUsername().equals(userName)) {
                target = tmpModel;
                break;
            }
        }
        //can't find the user, so you can't get access
        if (target == null) {
            httpServletResponse.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }
        String apiUri = httpServletRequest.getRequestURI().split("/")[2];

        List<String> models = target.getModels();
        if (!models.contains(apiUri)) {
            httpServletResponse.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }
}

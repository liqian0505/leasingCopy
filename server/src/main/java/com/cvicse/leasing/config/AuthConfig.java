package com.cvicse.leasing.config;

import com.cvicse.leasing.model.UserModel;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.*;
import org.springframework.stereotype.Component;

/**
 * 读取权限配置文件, 形成动态配置
 *
 * @author lfm
 */
@Component
public class AuthConfig {
    //    private static final sourcePath = "auth-config.xml";
    private static final String USER = "user";
    private static final String ACCESS_MODELS = "models";
    private static AuthConfig config;
    private List<UserModel> userModelList = new ArrayList<>();

    private AuthConfig() {
        load();
    }

    public Iterator<UserModel> getRedirectionList() {
        return userModelList.iterator();
    }

    public static AuthConfig getConfiguration() {
        //单例模式
        if (config == null) {
            config = new AuthConfig();
        }
        return config;
    }

    private void load() {
        String xmlStr = readFromXml();
        assert !xmlStr.isEmpty();
        try {
            Document document = DocumentHelper.parseText(xmlStr);

            Element rootElement = document.getRootElement();// 获取根节点
            for (Iterator<?> iterator = rootElement.elementIterator(); iterator.hasNext(); ) {
                Element element = (Element) iterator.next();
                UserModel userModel = new UserModel();
                userModel.setUsername(element.attributeValue(USER));
                userModel.setModels(element.attributeValue(ACCESS_MODELS));
                userModelList.add(userModel);
            }
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    /**
     * 从文件中读取
     * 迭代1 : 从静态的配置文件读取
     * 下一步,配置文件来源改为外部即可实现动态配置, 文件修改后再次读取配置文件即可
     */
    private String readFromXml() {
        InputStream is = AuthConfig.class.getClassLoader().
                getResourceAsStream("auth-config.xml");
        assert is != null;
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        return br.lines().reduce((str1, str2) -> str1 + str2).orElse("");
    }
}

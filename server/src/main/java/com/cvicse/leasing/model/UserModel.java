package com.cvicse.leasing.model;


import java.util.Arrays;
import java.util.List;

/**
 * 用于从配置文件中读取文件后的cache类
 * */
public class UserModel {
    private String username;
    private List<String> models;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getModels() {
        return models;
    }

    /**
     * @param models : Contract,Template
     * */
    public void setModels(String models) {
        String[] strings = models.split(",");
        this.models= Arrays.asList(strings);
    }
}

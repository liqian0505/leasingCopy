package com.cvicse.leasing.payload;

import com.alibaba.fastjson.JSONObject;

import javax.validation.constraints.NotNull;

public class TemplateRequest {
    private String id;

    @NotNull
    private JSONObject content;

    public void setId(String id) {
        this.id = id;
    }

    public String getId(){
        return this.id;
    }

    public void setContent(JSONObject content){
        this.content = content;
    }

    public JSONObject getContent() {
        return content;
    }
}
package com.cvicse.leasing.model;


import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;


@Data
@Document(collection = "Template")
public class Template {

    @Id
    private String id;

    public JSONObject content;


    public ArrayList<String> contractIdList = new ArrayList<>();

    public Template() {
    }

    public Template(JSONObject content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return String.format("Template[id=%s,content='%s']", id, content);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public JSONObject getContent() {
        return content;
    }

    public void setContent(JSONObject content) {
        this.content = content;
    }

    public ArrayList<String> getContractIdList() {
        return contractIdList;
    }


}
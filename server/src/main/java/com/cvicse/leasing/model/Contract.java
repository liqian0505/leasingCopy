package com.cvicse.leasing.model;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "Contract")
public class Contract {

    @Id
    public String id;

    public JSONObject content;

    public Contract() {
    }

    public Contract(JSONObject content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return String.format("Contract[id=%s, content='%s']", id, content);
    }

    public JSONObject getContent() {
        return content;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
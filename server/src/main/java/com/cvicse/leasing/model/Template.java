package com.cvicse.leasing.model;


import lombok.Data;
import org.springframework.data.annotation.Id;


@Data
public class Template {

    @Id
    public String id;

    public String content;

    public Template() {
    }

    public Template(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return String.format("Template[id=%s, content='%s']", id, content);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }
}